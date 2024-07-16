import datetime
import json
import os

import requests
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE_LOCATION = "datagov_metrics/credentials.json"
GA4_PROPERTY_ID = "properties/381392243"
DATA_DIR = r"../_data/reports_raw"

credentials = service_account.Credentials.from_service_account_file(
    KEY_FILE_LOCATION, scopes=["https://www.googleapis.com/auth/analytics.readonly"]
)
analytics = build("analyticsdata", "v1beta", credentials=credentials)
properties = analytics.properties()


def date_range(days_ago: int):
    today = datetime.date.today().strftime("%Y-%m-%d")
    days_ago_strfmt = (datetime.date.today() - datetime.timedelta(days=days_ago)).strftime(
        "%Y-%m-%d"
    )
    return [{"startDate": days_ago_strfmt, "endDate": today}]


def get_org_list():
    url = "https://catalog.data.gov/api/action/organization_list"
    repo = requests.get(url)
    data = repo.json()

    return data["result"]


def setup_organization_reports():
    orgs = get_org_list()
    org_reports = {}

    for org in orgs:
        org_dimension_filter = {
            "filter": {
                "fieldName": "customEvent:DATAGOV_dataset_organization",
                "stringFilter": {"matchType": "CONTAINS", "value": org},
            }
        }

        # report most viewd dataset pages per organization
        org_reports[f"{org}_request_dataset_pages_last30"] = {
            "dateRanges": date_range(30),
            "dimensions": [
                {"name": "pagePath"},
                {"name": "customEvent:DATAGOV_dataset_organization"},
                {"name": "customEvent:DATAGOV_dataset_publisher"},
            ],
            "dimensionFilter": org_dimension_filter,
            "metrics": [{"name": "screenPageViews"}],
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        }

        # report most downloaded files per organization
        org_reports[f"{org}_request_downloads_last30"] = {
            "dateRanges": date_range(30),
            "dimensions": [
                {"name": "linkUrl"},
                {"name": "customEvent:DATAGOV_dataset_organization"},
                {"name": "customEvent:DATAGOV_dataset_publisher"},
                {"name": "fileExtension"},
                {"name": "fileName"},
            ],
            "dimensionFilter": {
                "andGroup": {
                    "expressions": [
                        {
                            "filter": {
                                "fieldName": "eventName",
                                "stringFilter": {"matchType": "EXACT", "value": "file_download"},
                            }
                        },
                        org_dimension_filter
                    ],
                },
            },
            "metrics": [{"name": "eventCount"}],
            "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}],
        }

        # report most clicked outboud links per organization
        org_reports[f"{org}_request_outbound_links_last30"] = {
            "dateRanges": date_range(30),
            "dimensions": [
                {"name": "linkUrl"},
                {"name": "customEvent:DATAGOV_dataset_organization"},
                {"name": "customEvent:DATAGOV_dataset_publisher"},
                {"name": "outbound"},
            ],
            "dimensionFilter": {
                "andGroup": {
                    "expressions": [
                        {
                            "filter": {
                                "fieldName": "outbound",
                                "stringFilter": {"matchType": "EXACT", "value": "true"},
                            }
                        },
                        org_dimension_filter
                    ],
                },
            },
            "metrics": [{"name": "eventCount"}],
            "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}],
        }

    return org_reports


def setup_global_reports():
    global_reports = {}

    global_reports["request_pages_last30"] = {
        "dateRanges": date_range(30),
        "dimensions": [{"name": "pagePath"}],
        # TODO add filter to clean up pages?
        # "dimensionFilter": {},
        "metrics": [{"name": "screenPageViews"}],
        "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
    }

    global_reports["total_pageviews_last30"] = {
        "dateRanges": date_range(30),
        "metrics": [{"name": "screenPageViews"}],
    }

    global_reports["top_search_terms_last30"] = {
        "dateRanges": date_range(30),
        "dimensions": [{"name": "searchTerm"}],
        "dimensionFilter": {
            "andGroup": {
                "expressions": [
                    {
                        "notExpression": {
                            "filter": {
                                "fieldName": "searchTerm",
                                "stringFilter": {"matchType": "EXACT", "value": ""},
                            }
                        }
                    },
                    {
                        "notExpression": {
                            "filter": {
                                "fieldName": "searchTerm",
                                "stringFilter": {
                                    "matchType": "EXACT",
                                    "value": "Search datasets...",
                                },
                            }
                        }
                    },
                ]
            }
        },
        "metrics": [{"name": "eventCount"}],
        "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}],
    }

    global_reports["device_category_last30"] = {
        "dateRanges": date_range(30),
        "dimensions": [{"name": "deviceCategory"}],
        "metrics": [{"name": "activeUsers"}],
        "orderBys": [{"metric": {"metricName": "activeUsers"}, "desc": True}],
    }

    return global_reports


def setup_reports():
    reports = {}
    reports.update(setup_global_reports())
    reports.update(setup_organization_reports())

    return reports


def fetch_report(request):
    response = properties.runReport(property=GA4_PROPERTY_ID, body=request).execute()
    return response


def reshape_data_for_chartjs(response):
    """Reshape the response into a format consumable by Chart.js."""
    chart_data = {
        "labels": [],
        "data": [],
    }

    # TODO add filter to /dataset/?
    if response.get("rowCount") == 1:
        chart_data["labels"].append(response["metricHeaders"][0]["name"])
        chart_data["data"].append(int(response["rows"][0]["metricValues"][0]["value"]))
        return chart_data

    for row in response.get("rows", []):
        chart_data["labels"].append(row["dimensionValues"][0]["value"])
        chart_data["data"].append(int(row["metricValues"][0]["value"]))

    return chart_data


def save_chart_data(chart_data, filename):
    """Save the chart data to a JSON file."""
    os.makedirs(DATA_DIR, exist_ok=True)
    output_file_path = os.path.join(DATA_DIR, filename)
    with open(output_file_path, "w") as f:
        json.dump(chart_data, f, indent=4)


def main():
    reports = setup_reports()

    for report in reports:
        print(f"Fetching report: {report}")
        fetched_report = fetch_report(reports[report])
        # chart_data = reshape_data_for_chartjs(fetched_report)
        print(f"Saving chart data for {report} to {DATA_DIR}/{report}.json")
        save_chart_data(fetched_report, f"{report}.json")


if __name__ == "__main__":
    main()
