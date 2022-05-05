"use strict";
// Functions
// Transpose 2D array
function transpose(a) {
  return Object.keys(a[0]).map((c) => a.map((r) => r[c]));
}

// Data
const rData = [[], [], []],
  maxValues = [];

// fill 3x3 2D array with random data values from 0 to 10
for (let i in rData) {
  for (let j = 0; j < 3; j++) {
    rData[i].push(Math.random() * 10);
  }
}

// Create 2D array with one array of values for each category/month
const catData = transpose(rData);

// Find maximum y-value in each category
for (let i in catData) {
  maxValues.push(Math.max(...catData[i]));
}

const yMax = Math.max(...maxValues);

// Create chart
Highcharts.chart("container", {
  chart: {
    type: "column",
  },
  title: {
    text: "3 column series with random data",
  },
  yAxis: {
    endOnTick: false,
    max: 2 * yMax,
    plotLines: [
      {
        color: "green",
        dashStyle: "LongDash",
        value: 1.5 * yMax,
      },
    ],
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          if (maxValues.includes(this.y)) {
            return "max";
            // let dataMax = this.series.dataMax;
            // if (this.y === dataMax) {
            //   return "max";
          }
        },
      },
    },
  },
  series: [
    {
      name: "Tokyo",
      data: rData[0],
    },
    { name: "New York", data: rData[1] },
    { name: "London", data: rData[2] },
  ],
});
