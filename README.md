# datagov-11ty

The public-facing homepage of Data.gov (www.data.gov), built with [11ty](https://www.11ty.dev/) and the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/). Hosted on cloud.gov Pages.

- Production: [www.data.gov](https://www.data.gov)

## Getting Started

Install dependencies:

    npm install

Run a local dev instance:

    npm run dev

Run tests:

    npm run test

This runs:
- **content**: Cypress checks on the generated HTML
- **accessibility**: pa11y-ci on localhost using paths from sitemap.xml
- **inclusivity**: woke scans files for non-inclusive language

## Adding content

### Blog posts and updates

Create a new file in `posts/` using the format `YYYY-MM-DD-hyphenated-title.md`. Each file has front matter and content sections separated by `---`.

### Single pages

Add single pages to the `pages/` folder and set the `permalink` in the front matter.

## Broken links

A weekly QA cron job tests for broken links. Errors are added to the 📌 Link Checker Report. Add false positives to `.lycheeignore`.

Run locally with [lychee](https://lychee.cli.rs/installation/):

    lychee --base=https://data.gov .

## Related resources

- [Data.gov wiki](https://github.com/GSA/data.gov/wiki)
- [www.data.gov wiki page](https://github.com/GSA/data.gov/wiki/www.data.gov)
