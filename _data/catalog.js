const EleventyFetch = require('@11ty/eleventy-fetch');

const CATALOG_BASE_URL = 'https://catalog.data.gov';
const API_ROUTE = '/api/action/package_search';
const CATALOG_FILTERS = {
    datasets: 'rows=0',
    collections: 'fq=(collection_metadata:*)&include_private=true&rows=0',
    total_datasets: 'fq=(collection_package_id:*%20OR%20*:*)&include_private=true&rows=0',
};

const PIE_CHART_ENUM = {
    datasets: 'Datasets',
    total_datasets: 'Total Datasets',
};

const buildPieMetric = (results) => {
    const pie = [];
    for (let key in PIE_CHART_ENUM) {
        pie.push({
            label: PIE_CHART_ENUM[key],
            count: results[key],
        });
    }
    const pieString = encodeURIComponent(JSON.stringify(pie));
    return pieString;
};

module.exports = async function () {
    try {
        const results = {};
        const meta = {
            date: new Date().toLocaleDateString(),
            catalogUrl: CATALOG_BASE_URL,
        };
        for (const filter in CATALOG_FILTERS) {
            let json = await EleventyFetch(`${CATALOG_BASE_URL}${API_ROUTE}?${CATALOG_FILTERS[filter]}`, {
                duration: '1d',
                type: 'json',
            });
            // results[`${filter}`] = json.result.count.toLocaleString('en', { useGrouping: true });
            results[`${filter}`] = json.result.count;
        }
        const metrics = {
            pieMetric: buildPieMetric(results),
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

        console.log('Failed getting datasets count, returning empty object.');
        return {
            results: {},
        };
    }
};
