require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');
const CATALOG_BASE_URL = 'https://catalog.data.gov';
const PACKAGE_API_ROUTE = '/api/action/package_search';
const ORGANIZATION_API_ROUTE = '/api/action/organization_list';
const CATALOG_FILTERS = {
  datasets: 'rows=0',
  collections: 'fq=(collection_metadata:*)&include_private=true&rows=0',
  totalDatasets: 'fq=(collection_package_id:*%20OR%20*:*)&include_private=true&rows=0',
  harvestSources: 'fq=dataset_type:harvest&rows=1000',
};

const CACHE_CONFIG = {
  duration: '1d',
  type: 'json',
};
const PIE_CHART_ENUM = {
  datasetsInCollections: 'Datasets in Collections',
  datasets: 'Datasets',
};

const d = new Date();
const daysAgo = (days) => {
  const offset = d.setDate(d.getDate() - days);
  return new Date(offset).toISOString();
};

const dates = [daysAgo(0), daysAgo(7), daysAgo(30), daysAgo(365), daysAgo(9999)];

const normalizeMetrics = (number) => Math.log10(number);

const buildPieMetric = (results) => {
  const pie = [];
  for (let key in PIE_CHART_ENUM) {
    pie.push({
      label: PIE_CHART_ENUM[key],
      count: results[key],
    });
  }
  return encodeURIComponent(JSON.stringify(pie));
};

const buildDevicePieMetric = () => {
  const data = require('./device_category_last30.json');
  const pie = [];
  for (let key in data.labels) {
    pie.push({
      label: data.labels[key],
      count: data.data[key],
    });
  }
  return encodeURIComponent(JSON.stringify(pie));
};

const buildTopSearchTermsMetric = () => {
  const data = require('./top_search_terms_last30.json');
  console.log(data);

  const bar = [];
  for (let key in data.labels) {
    bar.push({
      label: data.labels[key],
      count: data.data[key],
    });
  }
  return encodeURIComponent(JSON.stringify(bar));
}

const buildOrgBarMetric = (results) => {
  const bar = [];
  for (let orgType in results.organizations) {
    let orgInfo = results.organizations[orgType];
    bar.push({
      label: orgType,
      data: [
        normalizeMetrics(orgInfo.agencies),
        normalizeMetrics(orgInfo.packages),
        normalizeMetrics(orgInfo.harvestSources),
      ],
    });
  }
  return encodeURIComponent(JSON.stringify(bar));
};

const buildDatasetsBarMetric = (results) => {
  const bar = [
    {
      data: results.datasetSizeByDate,
    },
  ];
  return encodeURIComponent(JSON.stringify(bar));
};

module.exports = async function () {
  try {
    let results = {};
    let harvestSources = [];
    const meta = {
      date: new Date().toGMTString(),
      catalogUrl: CATALOG_BASE_URL,
    };

    // retrieve catalog filters (datasets, collections, total datasets)
    for (let filter in CATALOG_FILTERS) {
      let json = await EleventyFetch(`${CATALOG_BASE_URL}${PACKAGE_API_ROUTE}?${CATALOG_FILTERS[filter]}`, CACHE_CONFIG);
      results[`${filter}`] = json.result.count;
      if (filter === 'harvestSources') {
        // we only care about actual results from harvest sources
        harvestSources = json.result.results;
      }
    }
    results.datasetsInCollections = results.totalDatasets - results.datasets;
    results.datasetSizeByDate = [];
    for (let i = 0; i < dates.length - 1; i++) {
      let json = await EleventyFetch(
        `${CATALOG_BASE_URL}${PACKAGE_API_ROUTE}?q=metadata_modified:%5B${dates[i + 1]}%20TO%20${dates[i]}%5D`,
        CACHE_CONFIG
      );
      results.datasetSizeByDate.push(json.result.count);
    }
    results.datasetSizeByDate.reverse(); // reverse order of values to put newest at end

    // calculate harvest source count per org
    const harvestSourceCount = harvestSources.reduce((allSources, source) => {
      const orgName = source?.organization?.name ?? 'None';
      const count = allSources[orgName] ?? 0;
      return {
        ...allSources,
        [orgName]: count + 1,
      };
    }, {});

    // get number of orgs and calculate offset needed
    const orgCount = await EleventyFetch(`${CATALOG_BASE_URL}${ORGANIZATION_API_ROUTE}`, CACHE_CONFIG);
    const maxOffset = Math.ceil(orgCount.result.length / 25);

    // fetch list of orgs and concat it into a single json
    let orgList = [];
    for (let i = 0; i <= maxOffset; i++) {
      const json = await EleventyFetch(
        `${CATALOG_BASE_URL}${ORGANIZATION_API_ROUTE}?all_fields=true&offset=${i * 25}`,
        CACHE_CONFIG
      );
      orgList = orgList.concat(json.result);
    }

    // reduce the org json to an object with count of agencies, packages, and harvest sources
    results.organizations = orgList.reduce((accum, org) => {
      const orgType = org['organization_type'];
      const orgName = org['name'];
      const orgCount = accum[orgType] ?? { agencies: 0, packages: 0, harvestSources: 0 };
      if (['Tribal', 'Non-Profit', 'University', undefined].includes(orgType)) return accum;
      return {
        ...accum,
        [orgType]: {
          agencies: orgCount.agencies + 1,
          packages: orgCount.packages + org['package_count'],
          harvestSources: orgCount.harvestSources + (harvestSourceCount[orgName] ?? 0),
        },
      };
    }, {});

    const metrics = {
      pieMetric: buildPieMetric(results),
      devicePieMetric: buildDevicePieMetric(),
      topSearchTermsMetric: buildTopSearchTermsMetric(),
      orgBarMetric: buildOrgBarMetric(results),
      datasetsBarMetric: buildDatasetsBarMetric(results),
    };

    return {
      results,
      meta,
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
