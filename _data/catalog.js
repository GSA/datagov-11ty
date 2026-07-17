require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');

const CATALOG_STATS_URL = 'https://catalog.data.gov/api/stats';
const PIE_CHART_LABELS = {
    datasetsInCollections: 'Datasets in Collections',
    datasets: 'Datasets',
};

const CACHE_CONFIG = {
    duration: '1d',
    type: 'json',
};

const buildPieMetric = (results) => {
    const pie = Object.entries(PIE_CHART_LABELS).map(([key, label]) => ({
        label,
        count: results[key],
    }));
    return encodeURIComponent(JSON.stringify(pie));
};

module.exports = async function () {
    try {
        const stats = await EleventyFetch(CATALOG_STATS_URL, CACHE_CONFIG);
        const totalDatasets = stats?.results?.datasets ?? 0;
        const datasetsInCollections = stats?.results?.datasetsWithIsPartOf ?? 0;
        const datasets = Math.max(totalDatasets - datasetsInCollections, 0);
        const results = {
            ...(stats?.results || {}),
            datasets,
            totalDatasets,
            datasetsInCollections,
        };
        const metrics = {
            ...(stats?.metrics || {}),
            pieMetric: buildPieMetric(results),
        };

        const meta = {
            date: stats?.meta?.date || new Date().toGMTString(),
            catalogUrl: CATALOG_STATS_URL,
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
            meta: {
                date: new Date().toGMTString(),
                catalogUrl: CATALOG_STATS_URL,
            },
            metrics: {},
        };
    }
};
