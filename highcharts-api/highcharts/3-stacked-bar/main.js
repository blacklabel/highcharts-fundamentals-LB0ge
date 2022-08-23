'use strict';
// Function to add button
const addButton = function (x, y, chart) {
  chart.renderer
    .button(
      'How to fix',
      x,
      y,
      function () {
        console.log('Button clicked');
      },
      {
        'stroke': 'blue',
        'stroke-width': 2
      },
      {
        stroke: 'darkblue'
      }
    )
    .add();
};

Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      render: function () {
        const items = document.querySelectorAll(
          '.highcharts-button, .highcharts-axis-custom-labels'
        );
        items.forEach((b) => b.remove()); // clear buttons and custom labels before render

        const c = this;
        const x = c.chartWidth - 100; // buttons x-position
        const y = (i) => c.xAxis[0].toPixels(i - 1 / 4); // buttons y-positions

        // Add buttons
        for (let i = 0; i < c.series[0].data.length; i++) {
          addButton(x, y(i), c);
        }
        // Add custom labels
        c.renderer
          .text(
            '<text class="highcharts-axis-custom-labels" style="color: rgb(102, 102, 102); font-weight: bold">Record Count</text>',
            c.chartWidth / 4,
            46
          )
          .add();
        c.renderer
          .text(
            '<text class="highcharts-axis-custom-labels" style="color: rgb(102, 102, 102); font-weight: bold">Action</text>',
            x,
            46
          )
          .add();
      }
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    bar: {
      stacking: 'normal'
    }
  },
  xAxis: {
    title: {
      text: 'Issue', // "Custom" title. Could also have been added as custom label together with the other two labels
      offset: 0,
      rotation: 0,
      y: -150,
      x: 80,
      style: {
        'font-weight': 'bold'
      }
    },
    categories: ['Data', 'Emails', 'Duplicates', 'Support'],
    lineWidth: 0,
    gridLineWidth: 1,
    labels: {
      align: 'right',
      x: 120
    }
  },
  yAxis: {
    min: -100,
    max: 450,
    minPadding: 1000,
    title: {
      text: 'Amount',
      enabled: true
    },
    gridLineWidth: 0,
    lineWidth: 0,
    stackLabels: {
      enabled: true,
      format: '{total} K'
    },
    labels: {
      formatter: function () {
        if (this.value >= 0) {
          return this.value;
        }
      }
    }
  },
  series: [
    {
      data: [100, 50, 30, 20]
    },
    {
      data: [20, 10, 2, 5]
    },
    {
      data: [50, 75, 100, 30]
    },
    {
      data: [100, 200, 100, 20]
    }
  ]
});
