import Chart from 'chart.js/auto';

const URL = 'https://catalog.data.gov';

const DATAGOV_COLOR_PALETTE = ['216, 57, 51', '0, 80, 216', '239, 94, 37', '255, 190, 46', '253, 68, 150'];

const getRandomDataGovColor = () => DATAGOV_COLOR_PALETTE[Math.floor(Math.random() * DATAGOV_COLOR_PALETTE.length)];

const mapDataGovColors = () => DATAGOV_COLOR_PALETTE.map((color) => `rgba(${color}, 0.4)`);

const deNormalizeMetrics = (number) => Math.floor(Math.pow(10, number));

const buildPieConfig = (el) => {
    const dataString = el.dataset.metric;
    const data = JSON.parse(decodeURIComponent(dataString));
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
            // aspectRatio: 1.5,
            plugins: {
                title: {
                    display: true,
                    text: 'Dataset Distribution',
                },
            },
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
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            console.log(context);
                            let label = `${context.dataset.label}: `;
                            for (let value in context.raw) {
                                label += `${deNormalizeMetrics(context.raw[value])}, `;
                            }
                            let trueValue = deNormalizeMetrics(context.formattedValue) || '';
                            return `${label}: ${trueValue}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Agencies count',
                    },
                    ticks: {
                        callback: function (value, index, ticks) {
                            return deNormalizeMetrics(value);
                        },
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Harvest Sources count',
                    },
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
};

const buildDatasetBarConfig = (el) => {
    const dataString = el.dataset.metric;
    const data = JSON.parse(decodeURIComponent(dataString));
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
};

const buildOrgBarConfig = (el) => {
    const dataString = el.dataset.metric;
    const data = JSON.parse(decodeURIComponent(dataString));
    const config = {
        type: 'bar',
        data: {
            labels: ['Agencies', 'Datasets', 'Harvest Sources'],
            datasets: data.map((row, index) => ({
                label: row.label,
                data: row.data,
                backgroundColor: `rgba(${DATAGOV_COLOR_PALETTE[index]}, 0.4)`,
            })),
        },
        options: {
            aspectRatio: 1.4,
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
};

(async function () {
    const piEl = document.getElementById('datagov-pie-chart');
    new Chart(piEl, buildPieConfig(piEl));

    // const bubbleEl = document.getElementById('datagov-bubble-chart');
    // new Chart(bubbleEl, buildBubbleConfig(bubbleEl));

    const orgBarEl = document.getElementById('datagov-bar-chart-org');
    new Chart(orgBarEl, buildOrgBarConfig(orgBarEl));

    const datasetBarEl = document.getElementById('datagov-bar-chart-datasets');
    new Chart(datasetBarEl, buildDatasetBarConfig(datasetBarEl));
})();
