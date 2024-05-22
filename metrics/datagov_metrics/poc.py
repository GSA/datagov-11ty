from google.oauth2 import service_account
from googleapiclient.discovery import build

# Path to your service account key file
KEY_FILE_LOCATION = "datagov_metrics/tts-datagov-472349c4245b.json"
# Your GA4 property ID
PROPERTY_ID = "properties/381392243"

# Initialize a session using service account credentials
credentials = service_account.Credentials.from_service_account_file(
    KEY_FILE_LOCATION, scopes=["https://www.googleapis.com/auth/analytics.readonly"]
)

# Build the service object
analytics = build("analyticsdata", "v1beta", credentials=credentials)

# Create a report request object
request = {
    "dateRanges": [{"startDate": "2024-05-10", "endDate": "2024-05-11"}],
    "dimensions": [{"name": "city"}],
    "metrics": [{"name": "activeUsers"}],
}

# Make the API request
properties = analytics.properties()
print(properties)
response = (
    properties.runReport(property=PROPERTY_ID, body=request).execute()
)

# Print the response
print(response)
