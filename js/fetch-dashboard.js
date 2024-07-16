import Chart from 'chart.js/auto';

const DATAGOV_COLOR_PALETTE = ['216, 57, 51', '0, 80, 216', '239, 94, 37', '255, 190, 46', '253, 68, 150'];
const DATAGOV_COLOR_OPACITY = '0.75';

const getRandomDataGovColor = () => DATAGOV_COLOR_PALETTE[Math.floor(Math.random() * DATAGOV_COLOR_PALETTE.length)];

const mapDataGovColors = () => DATAGOV_COLOR_PALETTE.map((color) => `rgba(${color}, ${DATAGOV_COLOR_OPACITY})`);

const deNormalizeMetrics = (number) => Math.floor(Math.pow(10, number));

const metricConfigs = {
  getData: (el) => JSON.parse(decodeURIComponent(el.dataset.metric)),
  buildPieConfig: (el, text) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'doughnut',
      data: {
        labels: data.map((row) => row.label),
        datasets: [
          {
            data: data.map((row) => row.count),
            backgroundColor: mapDataGovColors(),
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: text,
          },
        },
      },
    };
    return config;
  },
  buildDatasetBarConfig: (el) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'bar',
      data: {
        labels: ['Older', 'Last year', 'Last month', 'Last week'],
        datasets: data.map((row) => ({
          data: row.data,
          backgroundColor: mapDataGovColors(),
        })),
      },
      options: {
        aspectRatio: window.innerWidth > 480 && window.innerWidth < 1024 ? 1 : 2,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Dataset Age',
          },
        },
      },
    };
    return config;
  },
  buildOrgBarConfig: (el) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'bar',
      data: {
        labels: ['Agencies', 'Datasets', 'Harvest Sources'],
        datasets: data.map((row, index) => ({
          label: row.label,
          data: row.data,
          backgroundColor: `rgba(${DATAGOV_COLOR_PALETTE[index]}, ${DATAGOV_COLOR_OPACITY})`,
        })),
      },
      options: {
        aspectRatio: window.innerWidth < 480 ? 0.75 : 1.405,
        plugins: {
          legend: {
            display: window.innerWidth < 480 ? false : true,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                let trueValue = deNormalizeMetrics(context.formattedValue) || '';
                return `${label}: ${trueValue}`;
              },
            },
          },
          title: {
            display: true,
            text: 'Key Metrics by Organization Type',
          },
        },
        scales: {
          y: {
            ticks: {
              callback: function (value, index, ticks) {
                return deNormalizeMetrics(value);
              },
            },
          },
        },
      },
    };
    return config;
  },
  buildTopSearchTermsConfig: (el) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'bar',
      data: {
        axis: 'y',
        labels: data.map((row) => row.label),
        datasets: [
          {
            // label: 'Top Search Terms',
            data: data.map((row) => row.count),
            backgroundColor: mapDataGovColors(),
            borderColor: mapDataGovColors(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Data.gov Top Search Terms',
          },
          legend: {
            display: false
          }
        },
      },
    };
    return config;
  },
  buildOrgMostViewedConfig: (el) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'bar',
      data: {
        axis: 'y',
        labels: data.map((row) => row.label),
        datasets: [
          {
            label: 'Organization Most Viewed Datasets',
            data: data.map((row) => row.count),
            backgroundColor: mapDataGovColors(),
            borderColor: mapDataGovColors(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Organization Most Viewed Datasets',
          },
        },
      },
    };
    return config;
  },
  buildOrgOutboundLinksConfig: (el) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'bar',
      data: {
        axis: 'y',
        labels: data.map((row) => row.label),
        datasets: [
          {
            label: 'Organization Most Outbound Links',
            data: data.map((row) => row.count),
            backgroundColor: mapDataGovColors(),
            borderColor: mapDataGovColors(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Organization Most Outbound Links',
          },
        },
      },
    };
    return config;
  },
  buildOrgMostDownloadedConfig: (el) => {
    const data = metricConfigs.getData(el);
    const config = {
      type: 'bar',
      data: {
        axis: 'y',
        labels: data.map((row) => row.label),
        datasets: [
          {
            label: 'Organization Most Downloaded Datasets',
            data: data.map((row) => row.count),
            backgroundColor: mapDataGovColors(),
            borderColor: mapDataGovColors(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Organization Most Downloaded Datasets',
          },
        },
      },
    };
    return config;
  },
};

(async function () {
  // Dashboard global charts
  const devPiEl = document.getElementById('datagov-pie-chart');
  if (devPiEl) {
    new Chart(devPiEl, metricConfigs.buildPieConfig(devPiEl, 'Visits by Device Type'));
  }

  const topSearchTermsEl = document.getElementById('datagov-desc-bar-chart-topsearchterms');
  if (topSearchTermsEl) {
    new Chart(topSearchTermsEl, metricConfigs.buildTopSearchTermsConfig(topSearchTermsEl));
  }

  // Dashboard org charts
  const orgMostViewedEl = document.getElementById('datagov-desc-bar-chart-mostviewed-nasa-gov');
  if (orgMostViewedEl) {
    new Chart(orgMostViewedEl, metricConfigs.buildOrgMostViewedConfig(orgMostViewedEl));
  }

  const orgMostDownloadedEl = document.getElementById('datagov-desc-bar-chart-mostdownloaded-nasa-gov');
  if (orgMostDownloadedEl) {
    new Chart(orgMostDownloadedEl, metricConfigs.buildOrgMostDownloadedConfig(orgMostDownloadedEl));
  }

  const orgMostOutboundEl = document.getElementById('datagov-desc-bar-chart-mostoutbound-nasa-gov');
  if (orgMostOutboundEl) {
    new Chart(orgMostOutboundEl, metricConfigs.buildOrgOutboundLinksConfig(orgMostOutboundEl));
  }
})();
