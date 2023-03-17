Highcharts.chart('container', {

  chart: {
    type: 'column',
    events: {
      render() {
        const chart = this,
          yAxis = chart.yAxis[0],
          allSeries = chart.series;

        if (chart.customLines) {
          chart.customLines.destroy();
        }
        chart.customLines = chart.renderer.g().add().toFront();

        allSeries.forEach((series) => { // iterate through each series
          let points = series.points;
          if (series.visible) {
            for (let i = 0; i < points.length - 1; i++) { // iterate through points
              const xFrom = points[i].shapeArgs.x + chart.plotLeft,
                xTo = points[i + 1].shapeArgs.x + chart.plotLeft,
                yFrom = yAxis.toPixels(points[i].y),
                yTo = yAxis.toPixels(points[i + 1].y),
                colWidth = points[i].shapeArgs.width;

              chart.renderer // draw line from current to next point
                .path(['M', xFrom + colWidth - 1, yFrom + 2, 
                  'L', xTo + 1, yTo + 2])
                .attr({ 'stroke': series.color, 'stroke-width': '2px' })
                .add(chart.customLines);
            }
          }
        });
      }
    }
  },

  series: [...Array(3)].map(() => ({
    data: [...Array(5)].map(() => Math.floor(Math.random() * 15) + 1)
  }))

});
