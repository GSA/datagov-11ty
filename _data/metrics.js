require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');
const csv = require("csvtojson/v2");

const S3_BASE_URL = 'https://s3-us-gov-west-1.amazonaws.com/cg-baa85e06-1bdd-4672-9e3a-36333c05c6ce/'

const GET_ORG_LIST_URL = "https://catalog.data.gov/api/action/organization_list?all_fields=true&limit=1"

// number of reports to display when data should be truncated.
const TRUNCATED_COUNT = 10

const REPORTS = {
  GLOBAL: {
    PAGEVIEWS: {
      title: "Total Pageviews",
      description: "Top pageviews sitewide",
      url: "global__total_pageviews__last30.csv"
    },
    DEVICE_TYPE: {
      title: "Pageviews by Device Type",
      description: "",
      url: "global__device_category__last30.csv"
    },
    DATASETS_PER_ORG: {
      title: "Number of Datasets per Organization",
      description: "Count of datasets by organization",
      url: "global__datasets_per_org.csv"
    },
    HARVEST_SOURCES_PER_ORG: {
      title: "Number of Harvest Sources per Organization",
      description: "Count of harvest sources by organization",
      url: "global__harvest_sources.csv"
    },
    TOP_SEARCH_TERMS: {
      title: "Top Search Terms",
      description: "Top searchterms sitewide",
      url: "global__top_search_terms__last30.csv"
    }
  },
  // ORG is a meta constructor for orgs
  ORG: {
    MOST_VIEWED_DATASETS: {
      title: "Most Viewed Dataset Pages",
      description: "Top 10 dataset pages by pageviews in the last 30 days",
      url: "page_requests__last30.csv"
    },
    MOST_DOWNLOADED_DATASETS: {
      title: "Most Downloaded Datasets",
      description: "Top 10 files by download count in the last 30 days",
      url: "download_requests__last30.csv"
    },
    MOST_CLICKED_OUTBOUND_LINKS: {
      title: "Most Clicked Outbound Links",
      description: "Top 10 external link clicks in the last 30 days",
      url: "link_requests__last30.csv"
    }
  }
}

CACHE_DURATION = '22h'

async function downloadCSVFromS3(url) {
  const csvString = await EleventyFetch(url, {
    duration: CACHE_DURATION,
    method: 'get',
    "headers": {
      "content-type": 'text/csv;charset=UTF-8'
    }
  })
    .then((response) => response.toString())

  return csv({
    noheader: true,
    output: "csv"
  }).fromString(csvString)
    .then((csvRow) => csvRow)
}

const downloadJSON = async (url) => {
  return await EleventyFetch(url, {
    duration: CACHE_DURATION,
    type: 'json'
  });
}

const buildDescBarChartMetric = (data) => {
  const bar = [];
  for (let key in data.labels) {
    bar.push({
      label: data.labels[key],
      count: data.data[key],
    });
  }
  return encodeURIComponent(JSON.stringify(bar));
}


module.exports = async function () {
  try {

    // get org infos
    let { result } = await downloadJSON(GET_ORG_LIST_URL);
    let orgList = result;

    // get data
    const data = {}
    for (let type in REPORTS) {
      if (type == "ORG") {
        // add org forloop
        for (let org of orgList) {
          let orgName = org.name
          data[orgName] = {}
          for (let report in REPORTS[type]) {
            data[orgName][report] = await downloadCSVFromS3(`${S3_BASE_URL}${orgName}__${REPORTS.ORG[report].url}`)
          }
        }
      } else {
        data[type] = {}
        for (let report in REPORTS[type]) {
          data[type][report] = await downloadCSVFromS3(`${S3_BASE_URL}${REPORTS[type][report].url}`)
        }

      }
    }

    // now structure data
    const shapedData = {}
    for (let type in REPORTS) {
      if (type == "ORG") {
        shapedData[type] = {}
        for (let org of orgList) {
          let orgName = org.name
          shapedData[type][orgName] = []
          for (let report in REPORTS.ORG) {
            report = {
              meta: {
                key: report,
                title: REPORTS.ORG[report].title,
                description: REPORTS.ORG[report].description,
                reportLink: `${S3_BASE_URL}${orgName}__${REPORTS.ORG[report].url}`
              },
              // truncate data before attaching
              data: data[orgName][report].slice(0, TRUNCATED_COUNT)
            }
            shapedData[type][orgName].push(report)
          }


        }
      } else {
        shapedData[type] = []
        for (let report in REPORTS[type]) {
          report = {
            meta: {
              key: report,
              title: REPORTS[type][report].title,
              description: REPORTS[type][report].description,
              reportLink: `${S3_BASE_URL}${REPORTS[type][report].url}`
            },
            // truncate data before attaching
            data: data[type][report].slice(0, TRUNCATED_COUNT)
          }
          shapedData[type].push(report)
        }
      }
    }

    // build charts
    const metrics = {
      topSearchTermsMetric: buildDescBarChartMetric(data.GLOBAL.TOP_SEARCH_TERMS)
    };

    // save to friendly namespace
    const global = shapedData.GLOBAL
    const orgs = shapedData.ORG

    return {
      global,
      orgs,
      metrics,
      orgList
    };

  } catch (e) {
    if (process.env.NODE_ENV === 'prod') {
      // Fail the build in production.
      return Promise.reject(e);
    }

    console.error(`ERROR :: Fetch failed :: ${e}`);
    return {
      results: {},
    };
  }
};
