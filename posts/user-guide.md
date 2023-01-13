---
date: '2023-01-09T11:55:00'
layout: layouts/post
excerpt: 'Data.gov is the United States government’s open data website. It provides access to datasets published by agencies across the federal government. Data.gov is intended to provide access to government open data to the public, achieve agency missions, drive innovation, fuel economic activity, and uphold the ideals of an open and transparent government.'
link: https://www.data.gov/open-gov
permalink: 'user-guide/'

slug: user-guide
title: User Guide
---

## Background

Data.gov is the United States government’s open data website. It provides access to datasets published by agencies across the federal government. Data.gov is intended to provide access to government open data to the public, achieve agency missions, drive innovation, fuel economic activity, and uphold the ideals of an open and transparent government.

The impetus for the creation of Data.gov was the January 2009 Presidential Memorandum on Transparency and Open Government. The U.S. General Services Administration (GSA)l working with the Office of Management and BudgetOffice of Management and Budget (OMB) and other agency partners, launched Data.gov on May 21, 2009. In 2014, the current version of the Data.gov catalog was launched. Agencies compile metadata such as title, description, keywords, and links for accessing their datasets, and the Data.gov catalog automatically “harvests” that metadata to populate a continually updated catalog.

In 2019, the process of maintaining a central catalog of federal agency datasets was made a statutory mandate under the OPEN Government Data Act. Federal agencies are required by statute to create and maintain comprehensive metadata inventories to be harvested by a central federal catalog operated by GSA.

## Data.gov Catalog Harvesting

In accordance with the requirements of the OPEN Government Data Act, the Data.gov catalog is populated by harvesting federal agency harvest sources that have the metadata inventories of the agency datasets. For example, GSA datasets are obtained from the GSA metadata harvest source. Each federal agency has a harvesting location, and the Data.gov catalog has a harvester that checks each federal agency on a set schedule, such as daily/weekly/monthly. Any additions, edits, or deletions of dataset metadata are reflected in the most recent harvest by the Data.gov catalog. As a result, the Data.gov catalog is a consolidated, continually updated catalog of federal datasets.

While the OPEN Government Data Act is a requirement for federal agencies, many states, counties and cities have open datasets and maintain open data websites. If these non-federal entities choose to make their metadata available in a similar fashion to the federal agencies, Data.gov adds the harvest source so that the non-federal datasets can also be included in the catalog. Users accessing non-federal datasets through Data.gov should keep in mind that non-federal datasets have different terms of service and licenses than federal data. Specific terms should be available in the “Access and Use” section of the catalog entry for the non-federal datasets.

## Finding Datasets

When you navigate to https://catalog.data.gov/dataset, you will see the first page of the entire catalog. Currently, the default view on the catalog is ordered by the most popular. Datasets are ranked by page views in the preceding two weeks. The number of recent views is shown in orange to the right of the dataset title.

![Data.gov catalog order by button](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_order-by-button.png 'Data.gov catalog order by button')

To choose a different ordering, such as by Date Added or Last Modified, click on the arrow next to the “Order By” box on the upper right of the page.

![Data.gov catalog order by options](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_order-by-options.png 'Data.gov catalog order by options')

Most users look for datasets by searching for keywords in the search box. To search the catalog, enter keywords in the search box.

![Data.gov catalog search by keywords](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_search-bar.png 'Data.gov catalog search by keywords')

You can browse on the left side through various filters to narrow the results. For example, under “Tags” you can filter by datasets that are tagged with additional keywords. If you want to filter by a particular agency, you can click for the agency or agencies under “Organizations.” Clicking on multiple items narrows your search. You can click on the “x” to the side of any single item to remove it from the search, or “clear all” to remove all selected items in a category.

![Data.gov catalog filter by tags](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_sidebar.png 'Data.gov catalog filter by tags')

You can also search for datasets by location, such as a zip code.

![Data.gov catalog seach by location](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_geo_search-screenshot.png 'Data.gov catalog seach by location')

Once you find a dataset or tool of interest, click on the title and you will be taken to a page with more details on that specific dataset or tool.

You can also browse all the datasets from a specific agency. The term “Organizations” refers to federal agencies, or non-federal entities like states and cities. By clicking on the Organizations button, you can search for the federal agency (or city, state, etc.) in the Organizations search bar. When you find the organization, click on the button to view all the datasets from that organization.

![Data.gov catalog search by organization](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_organization-page.png 'Data.gov catalog search by organization')

## Understanding Dataset Pages

When you click on a dataset page, you can view the metadata provided for the dataset by the agency publishing the dataset. At the top of the page is the title of the dataset and the date when the record was most recently updated. Below the title is a description of the dataset provided by the agency.
Under the Access and Use section, there are links to any conditions on the use of the dataset. There are links to specific licenses under which the dataset is released. For the most part, federal agency datasets do not have restrictions on use.

Under the Downloads and Resources section is where you can access the dataset. If a direct download link is provided, you can download the dataset by clicking on the “Download” button. If there is a landing page for the dataset on the website for the agency, you can access it by clicking on the “Visit Page” button.

![Data.gov catalog download dataset metadata](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_access-and-use-and-download-resource-1.png 'Data.gov catalog download dataset metadata')

In the Dates section, you can see the date that the record was first added to the Data.gov catalog and the Metadata Source section has information about the agency harvest source for the dataset.

Below that are the keywords tagged by the agency to the dataset.

The Additional Metadata section shows the rest of the metadata associated with the dataset, including a “Maintainer,” which shows either an individual or group address with specific responsibility for the dataset. Clicking on “Show More” will reveal the full metadata for the dataset.

![Data.gov catalog show additional dataset metadata](https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/dg-user-guide_additional-metadata.png 'Data.gov catalog show additional dataset metadata')

The metadata for each dataset follows a standard schema, such as the DCAT US 1.1 standard. Fuller explanation of each field in the schema is provided on resources.data.gov, which is a repository of tools, policies, and guidance related to federal open data efforts.

## Geospatial Datasets

Many datasets in the Data.gov are geospatial datasets, with a tie to a specific geographic location. Geospatial datasets are also covered by a separate statute, the Geospatial Data Act (GDA), which requires that the Federal Geographic Data Committee maintain a site called geoplatform.gov. Federal agencies make all their data assets available for harvesting by the Data.gov catalog, and the geoplatform.gov site pulls geospatial datasets into geoplatform.gov. Geospatial datasets are described by different metadata schemas specific to geospatial data.

## Data.gov CKAN API

The data.gov catalog is powered by CKAN, an open source data platform that includes a robust API. Please be aware that data.gov and the data.gov CKAN API only contain metadata about datasets. This metadata includes URLs and descriptions of datasets, but it does not include the actual data within each dataset.

The base URL for the Data.gov CKAN API is: http://catalog.data.gov/api/3/
Complete API documentation is available from CKAN.

## Contact Data.gov

If you have questions about a particular dataset, the contact responsible for the dataset is listed as “Maintainer” in the metadata record. If you are not able to reach the maintainer, or have additional questions, click on “Contact” on the upper right of Data.gov. You will be directed to a form where you can ask your question or leave a comment. For fixing a broken link or requests for additional datasets, the Data.gov team will contact our liaison at the relevant agency, since changes to the metadata or adding new datasets in the catalog are actions taken at the agency level.
