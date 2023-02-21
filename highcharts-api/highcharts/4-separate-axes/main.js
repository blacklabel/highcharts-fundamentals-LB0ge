const yMax = 100;
const data_1 = [32, 43, 55, 78, 12];
const data_2 = [50, 56, 50, 40, 14];

const mainColor = '#FF0000';
const restColor = '#A1B5C9';

Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      render() {
        const chart = this,
            titlePosY = -chart.plotHeight - chart.plotTop,
            titlePosX = chart.yAxis[0].options.title.x,
            titlePosXNew = -chart.chartWidth  / 3;

        // Update and redraw yAxis options only if titlePosX is not equal to titlePosXNew
        if (titlePosX !== titlePosXNew){
            for(let i = 0; i < 2; i++){
            chart.yAxis[i].setTitle({y:titlePosY, x: i === 0 ? titlePosXNew : -titlePosXNew})
        }
        }
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
      categories: ['Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5'],
      lineWidth: 0,
      left: '50%',
      labels: {
        align: 'left'
      }
      
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
