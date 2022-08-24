'use strict';

// Data
const rData = [[], [], []];

// Fill 3x3 2D array with random integers from 0 to 10
for (let i in rData) {
  for (let j = 0; j < 3; j++) {
    rData[i].push(Math.floor(Math.random() * 11));
  }
}

const yMax = Math.max(...rData.flat());

// Create chart
Highcharts.chart('container', {
  chart: {
    polar: true,
    type: 'column'
  },
  title: {
    text: 'Polar chart with random data'
  },
  yAxis: {
    tickPositioner: function () {
      let pos = this.tickPositions;
      pos.splice(-1, 1, this.max);
      return pos;
    },
    max: 2 * yMax,
    plotLines: [
      {
        color: 'green',
        dashStyle: 'LongDash',
        value: 1.5 * yMax,
        zIndex: 5
      }
    ],
    plotBands: [
      {
        color: {
          linearGradient: { x1: 1, y1: 1, x2: 1, y2: 0 },
          stops: [
            [0, '#E30B5C'],
            [1, '#6F5BE3']
          ]
        },
        from: yMax * (1 / 2),
        to: yMax * (5 / 8)
      }
    ]
  },
  xAxis: [
    {
      categories: ['Jan', 'Feb', 'Mar']
    },
    {
      lineWidth: 5,
      lineColor: 'blue',
      offset: -50
    }
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          if (this.y === yMax) {
            return 'max';
          }
        }
      }
    }
  },
  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        outerRadius: '40%',
        innerRadius: '35%',
        backgroundColor: 'yellow'
      }
    ]
  },
  series: [
    {
      name: 'Tokyo',
      data: rData[0]
    },
    { name: 'New York', data: rData[1] },
    { name: 'London', data: rData[2] },
    {
      type: 'pie',
      color: 'orangered',
      size: '80%',
      borderWidth: 10
    }
  ]
});
