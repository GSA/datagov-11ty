const isDev = process.env.ELEVENTY_ENV === 'development';

const baseUrl = process.env.BASEURL ? process.env.BASEURL : '' 

const helpers = {
  baseUrl,
}

module.exports = helpers;