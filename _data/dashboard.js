require('dotenv').config();
const path = require("path");

const CACHE_CONFIG = {
  duration: '1d',
  type: 'json',
};

async function downloadObject(url) {
  try {
    const fetchResponse = await fetch(url);
    return await fetchResponse.json();
  } catch (err) {
    console.error('Error - ', err);
  }
}

const buildDevicePieMetric = (reportPath) => {
  const data = require(reportPath);
  const pie = [];
  for (let key in data.labels) {
    pie.push({
      label: data.labels[key],
      count: data.data[key],
    });
  }
  return encodeURIComponent(JSON.stringify(pie));
};

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
    let data = await downloadObject('https://s3-us-gov-west-1.amazonaws.com/cg-6348e2ae-48ea-4133-ac22-8f248c43e1fd/top_search_terms_last30.json')
    const metrics = {
      topSearchTermsMetric: buildDescBarChartMetric(data)
    };

    return {
      metrics,
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
