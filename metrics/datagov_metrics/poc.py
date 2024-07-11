import datetime
import json
import os

import requests
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE_LOCATION = "datagov_metrics/credentials.json"
GA4_PROPERTY_ID = "properties/381392243"
DATA_DIR = r"../_data"

credentials = service_account.Credentials.from_service_account_file(
    KEY_FILE_LOCATION, scopes=["https://www.googleapis.com/auth/analytics.readonly"]
)
analytics = build("analyticsdata", "v1beta", credentials=credentials)
properties = analytics.properties()


def get_org_list():
    url = "https://catalog.data.gov/api/3/action/organization_list"
    repo = requests.get(url)
    data = repo.json()

    return data["result"]


def setup_organization_reports():
    orgs = get_org_list()
    org_reports = {}
    today = datetime.date.today().strftime("%Y-%m-%d")
    days_ago_7 = (datetime.date.today() - datetime.timedelta(days=7)).strftime(
        "%Y-%m-%d"
    )
    days_ago_30 = (datetime.date.today() - datetime.timedelta(days=30)).strftime(
        "%Y-%m-%d"
    )

    for org in orgs:
        # report most viewd dataset pages per organization
        org_reports["request_dataset_pages_last30"] = {
            "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
            "dimensions": [
                {"name": "pagePath"},
                {"name": "DATAGOV_dataset_organization"},
                {"name": "DATAGOV_dataset_publisher"},
            ],
            "dimensionFilter": {
                "filter": {
                    "fieldName": "DATAGOV_dataset_organization",
                    "stringFilter": {"value": f"/dataset/{org}"},
                }
            },
            "metrics": [{"name": "screenPageViews"}],
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
            "limit": 50,
        }

        # report most downloaded files per organization
        org_reports["request_downloads_last30"] = {
            "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
            "dimensions": [{"name": "pagePath"}],
            "metrics": [{"name": "screenPageViews"}],
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
            "limit": 50,
        }

        # report most clicked outboud links per organization
        org_reports["request_outbound_links_last30"] = {
            "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
            "dimensions": [{"name": "pagePath"}],
            "metrics": [{"name": "screenPageViews"}],
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
            "limit": 50,
        }

    return org_reports


def setup_reports():
    reports = {}
    today = datetime.date.today().strftime("%Y-%m-%d")
    days_ago_7 = (datetime.date.today() - datetime.timedelta(days=7)).strftime(
        "%Y-%m-%d"
    )
    days_ago_30 = (datetime.date.today() - datetime.timedelta(days=30)).strftime(
        "%Y-%m-%d"
    )

    reports["request_pages_last7"] = {
        "dateRanges": [{"startDate": days_ago_7, "endDate": today}],
        "dimensions": [{"name": "pagePath"}],
        "metrics": [{"name": "screenPageViews"}],
        "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        "limit": 50,
    }

    reports["request_pages_last30"] = {
        "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
        "dimensions": [{"name": "pagePath"}],
        "metrics": [{"name": "screenPageViews"}],
        "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        "limit": 50,
    }

    reports["total_pageviews_last30"] = {
        "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
        "metrics": [{"name": "screenPageViews"}],
    }

    reports["top_search_terms_last30"] = {
        "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
        "dimensions": [{"name": "searchTerm"}],
        "metrics": [{"name": "eventCount"}],
        "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}],
        "limit": 50,
    }

    reports["device_category_last30"] = {
        "dateRanges": [{"startDate": days_ago_30, "endDate": today}],
        "dimensions": [{"name": "deviceCategory"}],
        "metrics": [{"name": "activeUsers"}],
        "orderBys": [{"metric": {"metricName": "activeUsers"}, "desc": True}],
        "limit": 50,
    }

    reports.update(setup_organization_reports())

    return reports


def fetch_report(request):
    response = properties.runReport(property=GA4_PROPERTY_ID, body=request).execute()
    return response


def reshape_data_for_chartjs(response):
    """Reshape the response into a format consumable by Chart.js."""
    chart_data = {
        "labels": [],
        "datasets": [
            {
                "label": "Active Users",
                "data": [],
                "backgroundColor": "rgba(75, 192, 192, 0.2)",
                "borderColor": "rgba(75, 192, 192, 1)",
                "borderWidth": 1,
            }
        ],
    }

    if response.get("rowCount") == 1:
        chart_data["labels"].append(response["metricHeaders"][0]["name"])
        chart_data["datasets"][0]["data"].append(
            int(response["rows"][0]["metricValues"][0]["value"])
        )

        return chart_data

    for row in response.get("rows", []):
        chart_data["labels"].append(row["dimensionValues"][0]["value"])
        chart_data["datasets"][0]["data"].append(int(row["metricValues"][0]["value"]))

    return chart_data


def save_chart_data(chart_data, filename):
    """Save the chart data to a JSON file."""
    os.makedirs(DATA_DIR, exist_ok=True)
    output_file_path = os.path.join(DATA_DIR, filename)
    with open(output_file_path, "w") as f:
        json.dump(chart_data, f, indent=4)


def main():
    reports = setup_reports()
    today = datetime.date.today().strftime("%Y-%m-%d")

    for report in reports:
        print(f"Fetching report: {report}")
        fetched_report = fetch_report(reports[report])
        chart_data = reshape_data_for_chartjs(fetched_report)
        print(f"Saving chart data for {report} to {DATA_DIR}/{report}.json")
        save_chart_data(chart_data, f"{report}.json")


if __name__ == "__main__":
    main()
