import Chart from 'chart.js/auto';

const DATAGOV_COLOR_PALETTE = ['216, 57, 51', '0, 80, 216', '239, 94, 37', '255, 190, 46', '253, 68, 150'];
const DATAGOV_COLOR_OPACITY = '0.75';

const getRandomDataGovColor = () => DATAGOV_COLOR_PALETTE[Math.floor(Math.random() * DATAGOV_COLOR_PALETTE.length)];

const mapDataGovColors = () => DATAGOV_COLOR_PALETTE.map((color) => `rgba(${color}, ${DATAGOV_COLOR_OPACITY})`);

const deNormalizeMetrics = (number) => Math.floor(Math.pow(10, number));

const metricConfigs = {
  getData: (el) => JSON.parse(decodeURIComponent(el.dataset.metric)),
  buildDevicePieConfig: (el) => {
    console.log(el);
    const data = metricConfigs.getData(el);
    console.log(data);
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
            text: 'Dataset Distribution',
          },
        },
      },
    };
    return config;
  },
};

(async function () {
  const devPiEl = document.getElementById('datagov-device-pie-chart');
  new Chart(devPiEl, metricConfigs.buildDevicePieConfig(devPiEl));
})();
