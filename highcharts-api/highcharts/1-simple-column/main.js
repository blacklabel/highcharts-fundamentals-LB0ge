"use strict";
const rData = () => Math.random() * 10;
console.log(rData);
Highcharts.chart("container", {
  chart: {
    type: "column",
  },
  title: {
    text: "3 column series with random data",
  },
});
