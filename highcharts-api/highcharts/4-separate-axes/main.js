const categories = ['Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5'];
const yMax = 100;
const data_1 = [32, 43, 55, 78, 12];
const data_2 = [50, 56, 50, 40, 14];

const mainColor = '#FF0000';
const restColor = '#A1B5C9';

// Update xAxis options
const xAxisOptions = function (chart) {
  const labelPos = chart.chartWidth / 2;
  return {
    labels: {
      x: labelPos
    }
  };
};

// Update yAxis options
const yAxisOptions = function (chart, rightAxis = true) {
  const titlePosY = -chart.plotHeight - chart.plotTop;
  const titlePosX = (-chart.chartWidth * 1) / 3;

  if (rightAxis) {
    return {
      title: {
        y: titlePosY,
        x: titlePosX
      }
    };
  }

  if (!rightAxis) {
    return {
      title: {
        y: titlePosY,
        x: -titlePosX
      }
    };
  }
};

const updateAxisOptions = function (chart) {
  chart.xAxis[0].update(xAxisOptions(chart), false);
  chart.yAxis[0].update(yAxisOptions(chart), false); // right axis
  chart.yAxis[1].update(yAxisOptions(chart, false), true); // left axis, redraw here only
};

let chart = Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      render() {
        const chart = this;
        const xLabelPos = chart.xAxis[0].options.labels.x;
        const xLabelPosNew = chart.chartWidth / 2;

        // Update axis options and redraw only if xLabelPos is not equal to xLabelPosNew
        xLabelPos === xLabelPosNew || updateAxisOptions(chart);
      }
    },
    marginTop: 50
  },
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      stacking: 'normal',
      dataLabels: {
        format: '{y} %'
      }
    }
  },
  xAxis: [
    {
      categories: categories,
      lineWidth: 0
    }
  ],
  yAxis: [
    {
      title: {
        text: 'Non Managerial Position'
      },
      max: yMax * 2 * 1.1,
      left: '55%',
      tickInterval: 20
    },
    {
      title: {
        text: 'Managerial Position'
      },
      max: yMax * 2 * 1.1,
      left: '-55%',
      tickInterval: 20,
      reversed: true,
      offset: 0
    }
  ],
  series: [
    {
      data: data_1.map((val) => yMax - val),
      color: restColor
    },
    {
      data: data_1,
      color: mainColor,
      dataLabels: {
        enabled: true,
        align: 'left'
      }
    },
    { yAxis: 1,
      data: data_2.map((val) => yMax - val),
      color: restColor },
    {
      yAxis: 1,
      data: data_2,
      color: mainColor,
      dataLabels: {
        enabled: true,
        align: 'right'
      }
    }
  ]
});
