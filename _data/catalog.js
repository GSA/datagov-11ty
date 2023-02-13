require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
    try {
        let json = await EleventyFetch('https://catalog.data.gov/api/action/package_search', {
            duration: '1d',
            type: 'json',
        });

        return {
            datasets: json.result?.count.toLocaleString('en', { useGrouping: true }),
        };
    } catch (e) {
        // if(process.env.NODE_ENV === "production") {
        // 	// Fail the build in production.
        // 	return Promise.reject(e);
        // }

        console.log('Failed getting test count, returning 0');
        return {
            datasets: '',
        };
    }
};
