Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Des'
    ]
  },

  plotOptions: {
    series: {
      point: {
        events: {
          mouseOver() {
            let series = this.series,
              chart = series.chart,
              xAxis = series.xAxis;
            chart.currentCategory = this.category;
            xAxis.update({
              labels: {
                formatter() {
                  return `<span style="color: ${
                    this.value === chart.currentCategory ? 'red' : null
                  }">${this.value}</span>`;
                }
              }
            });
          }
        }
      },
      events: {
        mouseOut() {
          let chart = this.chart;
          chart.currentCategory = null;
          chart.redraw();
        }
      }
    }
  },

  series: ['Tokyo', 'New York', 'London', 'Berlin'].map((name) => ({
    name,
    data: [...Array(12)].map(() => Math.floor(Math.random() * 15) + 1)
  }))
});
