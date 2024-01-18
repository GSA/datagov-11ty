const fs = require('fs');
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const svgSprite = require('eleventy-plugin-svg-sprite');
const sitemap = require('@quasibit/eleventy-plugin-sitemap');
const path = require('path');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const yaml = require('js-yaml');
const {
    downloadShortCode,
    imageShortcode,
    imageWithClassShortcode,
    usaIconShortcode,
    datagovIconShortcode,
    usaCurrentShortcode,
} = require('./config/shortCodes');

module.exports = function (config) {
    // Set pathPrefix for site
    let pathPrefix = '/';

    config.addPassthroughCopy({ 'js/vendor/*.js': 'assets/js' });
    config.addPassthroughCopy({ 'styles/vendor/*.css': 'assets/css' });

    // Copy Netlify config straight through
    config.addPassthroughCopy({
        'config/netlify.yml': 'admin/config.yml',
    });

    // Copy USWDS init JS so we can load it in HEAD to prevent banner flashing
    config.addPassthroughCopy({
        './node_modules/@uswds/uswds/dist/js/uswds-init.js': 'assets/js/uswds-init.js',
    });

    // Copy the favicon
    config.addPassthroughCopy({
        'favicon.ico': 'favicon.ico',
    });

    // Add debugger filter
    config.addFilter('debugger', (...args) => {
        console.log(...args);
        debugger;
    });

    // Add String filter to put commas in numbers
    config.addFilter('toLocaleString', (string) => {
        return string.toLocaleString('en', { useGrouping: true });
    });

    // Add plugins
    config.addPlugin(EleventyRenderPlugin);

    // SVG Sprite Plugin for USWDS USA icons
    config.addPlugin(svgSprite, {
        path: './node_modules/@uswds/uswds/dist/img/usa-icons',
        svgSpriteShortcode: 'usa_icons_sprite',
        svgShortcode: 'usa_icons',
    });

    // SVG Sprite Plugin for USWDS USA icons
    config.addPlugin(svgSprite, {
        path: './_img/datagov-icons',
        svgSpriteShortcode: 'datagov_icons_sprite',
        svgShortcode: 'datagov_icons',
    });

    // Add Sitemap
    config.addPlugin(sitemap, {
        sitemap: {
            hostname: 'https://data.gov',
        },
    });

    // Allow yaml to be used in the _data dir
    config.addDataExtension('yaml', (contents) => yaml.load(contents));
    config.addDataExtension('yml', (contents) => yaml.load(contents));

    // Customize Markdown library and settings:
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    })
        .use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({
                placement: 'after',
                class: 'anchor-link',
                symbol: '#',
                level: [1, 2, 3, 4],
            }),
            slugify: config.getFilter('slugify'),
        })
        .use(markdownItAttrs);
    markdownLibrary.linkify.set({ fuzzyLink: false }); // disables converting URLs without protocol to link

    config.setLibrary('md', markdownLibrary);

    // Override Browsersync defaults (used only with --serve)
    config.setServerOptions({
        // Default values are shown:

        // Whether the live reload snippet is used
        liveReload: true,

        // Whether DOM diffing updates are applied where possible instead of page reloads
        domDiff: true,

        // The starting port number
        // Will increment up to (configurable) 10 times if a port is already in use.
        port: 8080,

        // Additional files to watch that will trigger server updates
        // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
        // Works great with a separate bundler writing files to your output folder.
        // e.g. `watch: ["_site/**/*.css"]`
        watch: [],

        // Show local network IP addresses for device testing
        showAllHosts: false,

        // Use a local key/certificate to opt-in to local HTTP/2 with https
        https: {
            // key: "./localhost.key",
            // cert: "./localhost.cert",
        },

        // Change the default file encoding for reading/serving files
        encoding: 'utf-8',
    });

    // If BASEURL env variable exists, update pathPrefix to the BASEURL
    if (process.env.BASEURL) {
        pathPrefix = process.env.BASEURL;
    }

    // Set image shortcodes
    config.addLiquidShortcode('download', downloadShortCode);
    config.addLiquidShortcode('image', imageShortcode);
    config.addLiquidShortcode('image_with_class', imageWithClassShortcode);
    config.addLiquidShortcode('usa_icon', usaIconShortcode);
    config.addLiquidShortcode('datagov_icon', datagovIconShortcode);
    config.addLiquidShortcode('usa_current', usaCurrentShortcode);

    config.addLiquidShortcode('page', (link) => path.join(pathPrefix, link));
    config.addLiquidShortcode('link', (link) => (link.startsWith('http') ? link : path.join(pathPrefix, link)));

    config.on('eleventy.after', async () => {
        // await postbuild();
    });

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: ['md', 'html', 'njk'],

        // Pre-process *.md files with: (default: `liquid`)
        // Other template engines are available
        // See https://www.11ty.dev/docs/languages/ for other engines.
        markdownTemplateEngine: 'liquid',

        // Pre-process *.html files with: (default: `liquid`)
        // Other template engines are available
        // See https://www.11ty.dev/docs/languages/ for other engines.
        htmlTemplateEngine: 'liquid',

        // Optional (default is shown)
        pathPrefix: pathPrefix,
        // -----------------------------------------------------------------

        dir: {
            input: 'pages',
            includes: '../_includes',
            data: '../_data',
            output: '_site',
        },
    };
};
