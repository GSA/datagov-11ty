require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');
const csv = require("csvtojson/v2");

const S3_BASE_URL = 'https://s3-us-gov-west-1.amazonaws.com/cg-baa85e06-1bdd-4672-9e3a-36333c05c6ce/'
const END_DATE_FILE = 'report-end-date.txt'

const GET_ORG_LIST_URL = 'https://catalog.data.gov/api/action/package_search?q=*:*&facet.field=["organization"]&facet.limit=200&rows=0'

const CACHE_DURATION = '22h'
const TRUNCATED_COUNT = 10

const REPORTS = {
  GLOBAL: {
    PAGEVIEWS: {
      title: "Total Pageviews",
      description: "Top pageviews sitewide",
      url: "global__total_pageviews__last30.[end_date].csv",
      columnKeys: ["screenPageViews"]
    },
    DEVICE_TYPE: {
      title: "Users by Device Type",
      description: "",
      url: "global__device_category__last30.[end_date].csv",
      columnKeys: ["deviceCategory", "activeUsers", "percentage"]
    }, 
    DATASETS_PER_ORG: {
      title: "Number of Datasets per Organization",
      description: "Count of datasets by organization",
      url: "global__datasets_per_org.[end_date].csv",
      columnKeys: ["organization", "count"]
    },
    HARVEST_SOURCES_PER_ORG: {
      title: "Number of Harvest Sources per Organization",
      description: "Count of harvest sources by organization",
      url: "global__harvest_sources.[end_date].csv",
      columnKeys: ["organization", "count"]
    }
  },
  // ORG is a meta constructor for orgs
  ORG: {
    MOST_VIEWED_DATASETS: {
      title: "Most Viewed Dataset Pages",
      description: "Top 10 dataset pages by pageviews",
      url: "page_requests__last30.[end_date].csv",
      columnKeys: ["pagePath", "screenPageViews"]
    },
    MOST_DOWNLOADED_DATASETS: {
      title: "Most Downloaded Dataset Files",
      description: "Top 10 downloaded files from dataset pages",
      url: "download_requests__last30.[end_date].csv",
      columnKeys: ["linkUrl", "pageTitle", "eventCount"]
    },
    MOST_CLICKED_OUTBOUND_LINKS: {
      title: "Most Clicked Outbound Links",
      description: "Top 10 external link clicks from dataset pages",
      url: "link_requests__last30.[end_date].csv",
      columnKeys: ["linkUrl", "pageTitle", "eventCount"]
    }
  }
}

const ENUMS = {
  "deviceCategory": "Device Category",
  "activeUsers": "Users",
  "searchTerm": "Search Term",
  "pageTitle": "Page Title",
  "eventCount": "Count",
  "organization": "Organization",
  "count": "Count",
  "percentage": "Percentage",
  "pagePath": "Page Path",
  "screenPageViews": "Pageviews",
  "linkUrl": "Url",
  "OVERRIDES": {
    "MOST_DOWNLOADED_DATASETS": {
      "linkUrl": "File Url"
    },
    "MOST_CLICKED_OUTBOUND_LINKS": {
      "linkUrl": "Link Url"
    }
  }
}

async function downloadCSVFromS3(url) {
  try {
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
  } catch (e) {
    console.error(`ERROR :: Fetch failed :: ${e}`);
    return []
  }
}

const downloadJSON = async (url) => {
  return await EleventyFetch(url, {
    duration: CACHE_DURATION,
    type: 'json'
  });
}

// for org list
// sort list of strings by name
const sortByName = (items) => {
  return items.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
}

// calculate device type percentages 
const calculateDeviceTypePercentages = (reportData = []) => {
  const total = reportData.slice(1, reportData.length).reduce((accum, val) => accum += parseInt(val[1]), 0)
  return reportData.map((val, index) => {
    if (index == 0) {
      val.push('percentage')
    } else {
      let percentage = (parseFloat(val[1]) / total * 100).toFixed(2)
      val.push(`${percentage}%`)
    }
    return val
  })
}

module.exports = async function () {
  // get org infos
  let { result: { search_facets: { organization: { items } } } } = await downloadJSON(GET_ORG_LIST_URL);
  let orgList = sortByName(items);

  let end_date = await EleventyFetch(`${S3_BASE_URL}${END_DATE_FILE}`, {type: "text"});

  // fetch raw data
  const data = {}
  for (let type in REPORTS) {
    if (type == "ORG") {
      // add org forloop
      for (let org of orgList) {
        let orgName = org.name
        data[orgName] = {}
        for (let report in REPORTS[type]) {
          data[orgName][report] = await downloadCSVFromS3(`${S3_BASE_URL}${orgName}__${REPORTS.ORG[report].url.replace("[end_date]", end_date)}`)
        }
      }
    } else {
      data[type] = {}
      for (let report in REPORTS[type]) {
        data[type][report] = await downloadCSVFromS3(`${S3_BASE_URL}${REPORTS[type][report].url.replace("[end_date]", end_date)}`)
      }

    }
  }

  // interpret that data
  //calculate devicetype percentages
  data.GLOBAL.DEVICE_TYPE = calculateDeviceTypePercentages(data.GLOBAL.DEVICE_TYPE)

  // structure that data for templating
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
              reportLink: `${S3_BASE_URL}${orgName}__${REPORTS.ORG[report].url.replace("[end_date]", end_date)}`,
              columnKeys: REPORTS.ORG[report].columnKeys
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
            reportLink: `${S3_BASE_URL}${REPORTS[type][report].url.replace("[end_date]", end_date)}`,
            columnKeys: REPORTS[type][report].columnKeys
          },
          // truncate data before attaching
          data: data[type][report].slice(0, TRUNCATED_COUNT)
        }
        shapedData[type].push(report)
      }
    }
  }
  const orgDict = orgList.reduce((accum, org) => {
    accum[org.name] = org.display_name
    return accum
  }, {})

  // save to friendly namespace
  const global = shapedData.GLOBAL
  const orgs = shapedData.ORG
  const enums = ENUMS

  return {
    end_date,
    global,
    orgs,
    orgList,
    orgDict,
    enums
  };
};
