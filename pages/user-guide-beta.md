---
date: '2023-01-09T11:55:00'
excerpt: 'Data.gov is the United States government’s open data website. It provides access to datasets published by agencies across the federal government. Data.gov is intended to provide access to government open data to the public, achieve agency missions, drive innovation, fuel economic activity, and uphold the ideals of an open and transparent government.'
link: https://www.data.gov/user-guide
permalink: 'user-guide-beta/'
slug: user-guide
title: User Guide
---

## Background

Data.gov is the United States government’s open data website. It provides access to datasets published by agencies across the federal government. Data.gov is intended to provide access to government open data to the public, achieve agency missions, drive innovation, fuel economic activity, and uphold the ideals of an open and transparent government.

The impetus for the creation of Data.gov was the January 2009 [Presidential Memorandum on Transparency and Open Government](https://www.govinfo.gov/app/details/DCPD-200900010). The U.S. [General Services Administration](https://www.gsa.gov/) (GSA), working with the [Office of Management and Budget (OMB)](https://www.whitehouse.gov/omb/) and other agency partners, launched Data.gov on May 21, 2009. In 2014, the current version of the Data.gov [catalog](https://catalog.data.gov/dataset) was launched. Agencies compile metadata such as title, description, keywords, and links for accessing their datasets, and the Data.gov catalog automatically “harvests” that metadata to populate a continually updated catalog.

In 2019, the process of maintaining a central catalog of federal agency datasets was made a statutory mandate under the [OPEN Government Data Act](https://www.congress.gov/115/plaws/publ435/PLAW-115publ435.pdf). Federal agencies are required by statute to create and maintain comprehensive metadata inventories to be harvested by a central federal catalog operated by GSA.

## Data.gov Catalog Harvesting

In accordance with the requirements of the OPEN Government Data Act, the Data.gov catalog is populated by harvesting federal agency harvest sources that have the metadata inventories of the agency datasets. For example, GSA datasets are obtained from the GSA metadata harvest [source](https://open.gsa.gov/data.json). Each federal agency has a harvesting location, and the Data.gov catalog has a harvester that checks each federal agency on a set schedule, such as daily/weekly/monthly. Any additions, edits, or deletions of dataset metadata are reflected in the most recent harvest by the Data.gov catalog. As a result, the Data.gov catalog is a consolidated, continually updated catalog of federal datasets.

While the OPEN Government Data Act is a requirement for federal agencies, many states, counties and cities have open datasets and maintain open data websites. If these non-federal entities choose to make their metadata available in a similar fashion to the federal agencies, Data.gov adds the harvest source so that the non-federal datasets can also be included in the catalog. Users accessing non-federal datasets through Data.gov should keep in mind that non-federal datasets have different terms of service and licenses than federal data. Specific terms should be available in the “Access and Use” section of the catalog entry for the non-federal datasets.

## Finding Datasets

When you navigate to https://catalog-beta.data.gov/, you will see the first page of the entire catalog. By default, datasets are sorted first by relevance and then by popularity, based on OpenSearch scores and page views from the past month. These numbers are displayed at the bottom of each dataset card.

![Data.gov catalog landing page]({{ "/_img/dg-user-guide_dataset-listing.png.png" | url }} "Data.gov catalog landing page")

To choose a different ordering, such as by Popularity, use the Sort by dropdown menu in the upper right corner of the page.

![Data.gov catalog sort by]({{ "/_img/dg-user-guide_sort.png" | url }} "Data.gov catalog sort by")

Most users find datasets by entering search terms in the search box. If you cannot find what you are looking for, or if your search returns more than 10,000 results, you will see search tips to help refine your query.

![Data.gov catalog search tips]({{ "/_img/dg-user-guide_search-tips.png" | url }} "Data.gov catalog search tips")


You can browse on the right side through various filters to narrow the results. For example, under Keywords you can filter by datasets that are tagged with additional keywords. If you want to filter by a particular agency, you can click for the agency under “Organizations.” Clicking on multiple items narrows your search. You can click on the “x” to the side of any single item to remove it from the search.

![Data.gov catalog search filters]({{ "/_img/dg-user-guide_search-filter.png" | url }} "Data.gov catalog search filters")

You can also search for datasets by Geography, such as a zip code.

![Data.gov catalog seach by location]({{ "/_img/dg-user-guide_search-geography.png" | url }} "Data.gov catalog seach by location")

Once you find a dataset or tool of interest, click on the title and you will be taken to a page with more details on that specific dataset or tool.

You can also browse all the datasets from a specific agency. The term “Organizations” refers to federal agencies, or non-federal entities like states and cities. By clicking on the Organizations button, you can search for the federal agency (or city, state, etc.) in the Organizations search bar. When you find the organization, click on the button to view all the datasets from that organization.

![Data.gov catalog search by organization]({{ "/_img/dg-user-guide_search-by-org.png" | url }} "Data.gov catalog search by organization")

## Understanding Dataset Pages


When you open a dataset detail page, you can view the metadata provided by the publishing agency. You will see the dataset title along with publisher and organization information and key dates, including when the metadata was last checked and last modified. The dataset description appears below, followed by keywords that you can click to search for related datasets.

The Complete Metadata section shows the rest of the metadata associated with the dataset, including a "Identifier" field which is the dataset's unique ID from the publishing source.

![Data.gov catalog Complete Metadata]({{ "/_img/dg-user-guide_metadata.png" | url }} "Data.gov catalog Complete Metadata")


In the sidebar, the Resources section lists all available distributions with file types; click a resource to open its download or access link.

![Data.gov catalog dataset Resources]({{ "/_img/dg-user-guide_resources.png" | url }} "Data.gov catalog dataset Resources")


The Access & Use section shows the license and access level when provided. Contact details appear if supplied by the publisher. Dataset Information includes the metadata last checked timestamp, a link to the harvest record raw data, and a map preview if a location is available. You can also use the Provide Feedback button to send questions or suggestions about the dataset.

![Data.gov catalog dataset sidebar info]({{ "/_img/dg-user-guide_dataset-sidebar.png" | url }} "Data.gov catalog Dataset sidebar info")


## Geospatial Datasets

Many datasets in the Data.gov are geospatial datasets, with a tie to a specific geographic location. Geospatial datasets are also covered by a separate statute, the [Geospatial Data Act](https://www.fgdc.gov/gda) (GDA), which requires that the [Federal Geographic Data Committee](https://fgdc.gov/) maintain a site called [geoplatform.gov](https://www.geoplatform.gov/). Federal agencies make all their data assets available for harvesting by the Data.gov catalog, and the geoplatform.gov site pulls geospatial datasets into geoplatform.gov. Geospatial datasets are described by different metadata schemas specific to geospatial data.


## Contact Data.gov

If you have questions about a particular dataset, the contact responsible for the dataset is listed as "Contact" on the sidebar. If you are not able to reach the Contact, or have additional questions, click on “Contact” on the upper right of Data.gov. You will be directed to a [form]({% page '/contact/' %}) where you can ask your question or leave a comment. For fixing a broken link or requests for additional datasets, the Data.gov team will contact our liaison at the relevant agency, since changes to the metadata or adding new datasets in the catalog are actions taken at the agency level.
