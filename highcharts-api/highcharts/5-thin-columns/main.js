const categories = ['BANK 1', 'BANK 2', 'BANK 3', 'BANK 4', 'BANK 5'];

const randNumGenerator = function (min, max) {
  return Math.random() * (max - min) + min;
};

const numCat = categories.length; // number of categories
const seriesPerCat = 500; // number of series per category
const randMin = 50; // random number min
const randMax = 95; // random number max

// Generate one dataset for all categories
const dataGenerator = function (num, randMin, randMax) {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push(randNumGenerator(randMin, randMax));
  }
  return data;
};

// Generate all datasets for all categories
let allSeries = [];

for (let i = 0; i < seriesPerCat; i++) {

  const data = dataGenerator(numCat, randMin, randMax)
  allSeries.push({data: data})
};

Highcharts.chart('container', {

  chart: {
    type: 'column',

  },
  title: {
    text: ''
  },
  type: 'column',
  legend: {
    enabled: false
  },


  plotOptions: {
    series: {
      color: '#ff0000',
      borderWidth: 0,
      enableMouseTracking: false,
      animation: false
    }

  },
  xAxis: {
    categories: categories,
  },

  yAxis: {
    tickInterval: 25,
    max: 125,
    title: {
      enabled: false
    },
    lineWidth: 1
  },
  series: allSeries

});
