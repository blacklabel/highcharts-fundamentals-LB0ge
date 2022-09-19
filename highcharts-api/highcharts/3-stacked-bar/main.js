// Functions

// Add button
const addButton = function (x, y, chart) {
  function onClickButton() {
    alert('Button clicked');
  }

  const button = chart.renderer
    .button('How to fix', x, y)
    .attr({
      'stroke': 'blue',
      'stroke-width': 2
    })
    .on('click', onClickButton)
    .on('mouseout' && 'mouseenter', function () {
      button.attr({
        'stroke': 'darkblue',
        'stroke-width': 2
      });
    })
    .on('mouseleave', function () {
      button.attr({
        'stroke': 'blue',
        'stroke-width': 2
      });
    })
    .add(buttonGroup);
};

// Add text label
const addTextLabel = function (text, xPos, yPos, chart) {
  chart.renderer
    .text(text, xPos, yPos)
    .css({ fontWeight: 'bold' })
    .add(customLabelGroup);
};

// Destroy groups of custom elements
const destroyElements = function (elementGroupArray) {
  elementGroupArray.forEach(
    (elementGroup) => elementGroup && elementGroup.destroy() // destroy if elementGroup already exists
  );
};

////////////////////////////////////////////////////////////////////////////////

// Global variables

let buttonGroup, customLabelGroup, tickExtensionGroup;

////////////////////////////////////////////////////////////////////////////////

// Create chart
const chart = Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      render: function () {
        const chart = this;

        // Destroy custom elements if rendered previously
        const customElementGroups = [
          buttonGroup,
          customLabelGroup,
          tickExtensionGroup
        ];
        destroyElements(customElementGroups);

        // Make new custom element groups
        buttonGroup = chart.renderer.g().add().toFront();
        customLabelGroup = chart.renderer.g().add().toFront();
        tickExtensionGroup = chart.renderer.g().add().toFront();

        // Buttons

        const buttonX = chart.chartWidth - 100; // buttons x-position
        const buttonY = (i) => chart.xAxis[0].toPixels(i - 1 / 4); // buttons y-positions

        // Ticks

        const ticks = chart.xAxis[0].ticks;
        const gridLineXStart = ticks[-1].gridLine.pathArray[0][1]; // x-position for start of gridlines
        const topGridLineY = ticks[-1].gridLine.pathArray[0][2]; // y-position of top gridline

        // Text labels:

        const textLabels = [
          // custom label texts and x-positions
          { text: 'Issue', xPos: 20 },
          { text: 'Record Count', xPos: chart.chartWidth / 4 },
          { text: 'Action', xPos: buttonX }
        ];

        const labelYPos = topGridLineY - 10; // y-position for all custom text labels

        // Add buttons
        for (let i = 0; i < chart.series[0].data.length; i++) {
          addButton(buttonX, buttonY(i), chart);
        }

        // Add extended gridlines
        Object.values(ticks).forEach((el) => {
          let yPos = el.gridLine.pathArray[0][2];

          chart.renderer
            .path(['M', gridLineXStart, yPos, 'L', 0, yPos])
            .attr({ 'stroke': '#e6e6e6', 'stroke-width': 1 })
            .add(tickExtensionGroup);
        });

        // Add custom labels
        for (let i = 0; i < textLabels.length; i++) {
          addTextLabel(
            textLabels[i].text,
            textLabels[i].xPos,
            labelYPos,
            chart
          );
        }
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
    }
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
