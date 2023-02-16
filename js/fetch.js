import Chart from 'chart.js/auto';
import fetch from 'node-fetch';

const URL = 'https://catalog.data.gov';

const DATAGOV_COLOR_PALETTE = ['#d83933', '#0050d8', '#71767A'];
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

(async function () {
    // const response = await fetch('https://api.github.com/users/github');
    const d = new Date();
    const daysAgo = (days) => {
        const offset = d.setDate(d.getDate() - days);
        return new Date(offset).toISOString();
    };

    const dates = [daysAgo(7), daysAgo(30), daysAgo(365)];

    const widgets = document.getElementsByClassName('datagov-charts');
    // console.log(widgets);
    // let data = [
    //     { year: 2010, count: 10 },
    //     { year: 2011, count: 20 },
    //     { year: 2012, count: 15 },
    //     { year: 2013, count: 25 },
    //     { year: 2014, count: 22 },
    //     { year: 2015, count: 30 },
    //     { year: 2016, count: 28 },
    // ];

    // data = {
    //     labels: ['food', 'Blue', 'Yellow'],
    //     datasets: [
    //         {
    //             data: [300, 50, 100],
    //             hoverOffset: 4,
    //         },
    //     ],
    // };

    // new Chart(document.getElementById('acquisitions'), {
    //     type: 'bar',
    //     data: {
    //         labels: data.map((row) => row.year),
    //         datasets: [
    //             {
    //                 label: 'Acquisitions by year',
    //                 data: data.map((row) => row.count),
    //             },
    //         ],
    //     },
    // });
    const piEl = document.getElementById('datagov-pie-chart');
    const piConfig = buildPiConfig(piEl);
    new Chart(piEl, piConfig);
})();
