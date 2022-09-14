// Function to add button

const addButton = function (x, y, chart) {
  function onClickButton() {
    console.log('Button clicked');
  }
  // prettier-ignore
  const button = chart.renderer
    .button('How to fix', x, y, onClickButton,
      {
        'stroke': 'blue',
        'stroke-width': 2
      },
      {
        stroke: 'darkblue'
      }
    )
    .add()
    .toFront();
  return button;
};

// Global variables
let customElements;
const chart = Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      render: function () {
        const c = this;

        // Buttons
        const buttonX = c.chartWidth - 100; // buttons x-position
        const y = (i) => c.xAxis[0].toPixels(i - 1 / 4); // buttons y-positions

        // Ticks
        const ticks = c.xAxis[0].ticks;
        const gridLineXStart = ticks[-1].gridLine.pathArray[0][1]; // x-position for start of gridlines

        // Destroy custom elements if rendered previously
        if (customElements) {
          //console.log(customElements[5].xGetter());
          customElements.forEach((el) => el.destroy());
        }

        // Add custom rendered elements: buttons, labels, extended gridlines
        customElements = [];

        // Add buttons
        for (let i = 0; i < c.series[0].data.length; i++) {
          customElements[i] = addButton(buttonX, y(i), c);
        }

        // Add custom labels

        customElements.push(
          c.renderer
            .text('Issue', 20, 46)
            .css({ fontWeight: 'bold' })
            .add()
            .toFront()
        );

        customElements.push(
          c.renderer
            .text('Record Count', c.chartWidth / 4, 46)
            .css({ fontWeight: 'bold' })
            .add()
            .toFront()
        );

        customElements.push(
          c.renderer
            .text('Action', buttonX, 46)
            .css({ fontWeight: 'bold' })
            .add()
            .toFront()
        );

        // Add extended gridlines
        Object.values(ticks).forEach((el) => {
          let yPos = el.gridLine.pathArray[0][2];
          customElements.push(
            c.renderer
              .path(['M', gridLineXStart, yPos, 'L', 0, yPos])
              .attr({ 'stroke': '#e6e6e6', 'stroke-width': 1 })
              .add()
              .toFront()
          );
        });
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
    categories: ['Data', 'Emails', 'Duplicates', 'Support'],
    lineWidth: 0,
    gridLineWidth: 1,
    labels: {
      align: 'right'
    },
    startOnTick: false
  },
  yAxis: {
    max: 450,
    title: {
      text: 'Amount'
    },
    gridLineWidth: 0,
    stackLabels: {
      enabled: true,
      format: '{total} K'
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
