---
date: '2009-10-01T17:15:15'
excerpt: Data.gov Metrics Dashboard
link: 'https://www.data.gov/metrics'
permalink: metrics/
redirect_from:
  - /dashboard/
slug: metrics
title: Datagov Metrics
---
<section class="usa-section metrics">
  <div class="grid-container">
    <div class="grid-row grid-gap-lg">
      <div class="grid-col-12 desktop:grid-col-4">
        <div class="grid-row">
          <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-12 margin-top-1 desktop:margin-top-0">
            <!-- Dataset Age -->
            {% if catalog and catalog.metrics and catalog.metrics.datasetsBarMetric %}
            {% include "metrics_widgets/bar-chart.html" name: 'datasets' metric: catalog.metrics.datasetsBarMetric
            class: 'usa-tooltip' toolTipText: 'Datasets grouped by when metadata was last modified' %}
            {% endif %}
          </div>
        </div>
      </div>
      <div class="grid-col-12">
        <div class="grid-row metrics__fetch-date">
          {% if catalog and catalog.meta and catalog.meta.date %}
          {% assign date = 'Last Updated: ' | append: catalog.meta.date %}
          <p>{{date}}</p>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- <div id="metrics"> -->
<!--   <div style="width: 800px;"> -->
<!--     <canvas id="metricsRequestsLast7Days"></canvas> -->
<!--     <canvas id="metricsRequestsLast28Days"></canvas> -->
<!--   </div>" -->
<!-- </div> -->

<!-- <script type="text/javascript" src="../_data/metrics.js"></script> -->

