const svg = document.querySelector('.line-chart');

new chartXkcd.Bar(svg, {
xLabel: 'Tag',
yLabel: 'Anrufe',
data: {
    labels:['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa','So'],
    datasets: [{
    label: 'Plan',
    data: [255, 220, 232, 260, 212 ,56, 22],
    }]
},
});
