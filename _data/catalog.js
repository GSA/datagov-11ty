require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');

const CATALOG_STATS_URL = 'https://catalog.data.gov/api/stats';

const CACHE_CONFIG = {
    duration: '1d',
    type: 'json',
};

module.exports = async function () {
    try {
        const stats = await EleventyFetch(CATALOG_STATS_URL, CACHE_CONFIG);

        const meta = {
            date: stats?.meta?.date || new Date().toGMTString(),
            catalogUrl: CATALOG_STATS_URL,
        };

        return {
            results: stats?.results || {},
            meta,
            metrics: stats?.metrics || {},
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
