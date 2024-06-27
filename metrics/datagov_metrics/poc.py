import datetime
import json
import os

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


def setup_reports():
    reports = {}
    today = datetime.date.today().strftime("%Y-%m-%d")
    days_ago_7 = (datetime.date.today() - datetime.timedelta(days=7)).strftime(
        "%Y-%m-%d"
    )
    days_ago_28 = (datetime.date.today() - datetime.timedelta(days=28)).strftime(
        "%Y-%m-%d"
    )

    reports["request_pages_last7"] = {
        "dateRanges": [{"startDate": days_ago_7, "endDate": today}],
        "dimensions": [{"name": "pagePath"}],
        "metrics": [{"name": "activeUsers"}],
        "orderBys": [{"metric": {"metricName": "activeUsers"}, "desc": True}],
        "limit": 50,
    }

    reports["request_pages_last28"] = {
        "dateRanges": [{"startDate": days_ago_28, "endDate": today}],
        "dimensions": [{"name": "pagePath"}],
        "metrics": [{"name": "activeUsers"}],
        "orderBys": [{"metric": {"metricName": "activeUsers"}, "desc": True}],
        "limit": 50,
    }

    # reports["active_users_last1"]
    # reports["active_users_last7"]
    # reports["active_users_last28"]

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

    for report in reports:
        print(f"Fetching report: {report}")
        fetched_report = fetch_report(reports[report])
        chart_data = reshape_data_for_chartjs(fetched_report)
        print(f"Saving chart data for {report} to {DATA_DIR}/{report}.json")
        save_chart_data(chart_data, f"{report}.json")


if __name__ == "__main__":
    main()
