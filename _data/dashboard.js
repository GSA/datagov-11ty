require('dotenv').config();
const path = require("path");

const CACHE_CONFIG = {
  duration: '1d',
  type: 'json',
};

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
  
  const buildDescBarChartMetric = (reportPath) => {
    const data = require(reportPath);
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
    const metrics = {
      topSearchTermsMetric: buildDescBarChartMetric(path.resolve('./reports/top_search_terms_last30.json'))
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
