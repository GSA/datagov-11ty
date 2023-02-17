import Chart from 'chart.js/auto';
import fetch from 'node-fetch';

const URL = 'https://catalog.data.gov';

const DATAGOV_COLOR_PALETTE = ['#d83933', '#0050d8', '#71767A'];

const getRandomDataGovColor = () => {
    return DATAGOV_COLOR_PALETTE[Math.floor(Math.random() * DATAGOV_COLOR_PALETTE.length)];
};

const deNormalizeMetrics = (number) => Math.floor(Math.pow(number, 10));

const buildPiConfig = (el) => {
    const dataString = el.dataset.metric;
    const data = JSON.parse(decodeURIComponent(dataString));
    const config = {
        type: 'pie',
        data: {
            labels: data.map((row) => row.label),
            datasets: [
                {
                    label: 'Datagov Pie Chart',
                    data: data.map((row) => row.count),
                    backgroundColor: DATAGOV_COLOR_PALETTE,
                    hoverOffset: 4,
                },
            ],
        },
    };
    return config;
};

const buildBubbleConfig = (el) => {
    const dataString = el.dataset.metric;
    const data = JSON.parse(decodeURIComponent(dataString));
    const config = {
        type: 'bubble',
        data: {
            datasets: data.map((row) => ({
                label: row.label,
                data: [
                    {
                        x: row.agencies,
                        y: row.harvestSources,
                        r: row.packages,
                    },
                ],
            })),
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Agencies count',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Harvest Sources count',
                    },
                },
            },
        },
    };
    return config;
};

const buildBarConfig = (el) => {
    const dataString = el.dataset.metric;
    const data = JSON.parse(decodeURIComponent(dataString));
    const config = {
        type: 'bar',
        data: {
            labels: ['Agencies', 'Datasets', 'Harvest Sources'],
            datasets: data.map((row) => ({
                label: row.label,
                data: row.data,
            })),
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            let trueValue = deNormalizeMetrics(context.formattedValue) || '';
                            return `${label}: ${trueValue}`;
                        },
                    },
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
    console.log(config);
    return config;
};

(async function () {
    // const piEl = document.getElementById('datagov-pie-chart');
    // new Chart(piEl, buildPiConfig(piEl));

    // const bubbleEl = document.getElementById('datagov-bubble-chart');
    // new Chart(bubbleEl, buildBubbleConfig(bubbleEl));

    const barEl = document.getElementById('datagov-bar-chart');
    new Chart(barEl, buildBarConfig(barEl));
})();
