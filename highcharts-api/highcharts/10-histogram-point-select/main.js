Highcharts.chart('container', {
  yAxis: [{ tickInterval: 3 }, { opposite: true }],

  xAxis: [{}, { opposite: true }],

  plotOptions: {
    series: {
      allowPointSelect: true,
      states: {
        inactive: {
          enabled: false
        }
      }
    }
  },

  series: [
    {
      baseSeries: 's1',
      type: 'histogram',
      xAxis: 1,
      yAxis: 1,
      point: {
        events: {
          click(e) {
            const chart = this.series.chart,
              bin = this,
              binOptions = bin.options,
              scatterPoints = chart.series[1].data;
            e.preventDefault();

            bin.select(); // select/deselect bin
            if (bin.selected) {
              scatterPoints.forEach((point) => {
                if (point.y >= binOptions.x && point.y <= binOptions.x2) {
                  point.selected = true;
                  point.setState('select');
                } else {
                  point.selected = false;
                }
              });
            }
          }
        }
      }
    },
    {
      id: 's1',
      type: 'scatter',
      data: [
        3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1,
        3, 5, 6
      ]
    }
  ]
});
