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
    type: 'column'
  },
  title: {
    text: '3 column series with random data'
  },
  yAxis: {
    // endOnTick: false, // endOnTick forces the axis to end on a tick. Set to true by default. In order to force the axis to end on a given max value (yAxis.max) and override the endOnTick option, we can set endOnTick to false.
    // Alternatively, if we instead want to show a tick on the yAxis max value, we can leave endOnTick to its default value and use tickPositioner to replace the last element in the tickPositions array with the max value.
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
        value: 1.5 * yMax
      }
    ]
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar']
  },
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
  series: [
    {
      name: 'Tokyo',
      data: rData[0]
    },
    { name: 'New York', data: rData[1] },
    { name: 'London', data: rData[2] }
  ]
});
