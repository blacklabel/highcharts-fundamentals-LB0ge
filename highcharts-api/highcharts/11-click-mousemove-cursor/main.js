function renderCircle(x, y) {
  return this.renderer
    .circle(x, y, 5)
    .attr({
      'fill': 'blue',
      'stroke': 'black',
      'stroke-width': 1
    })
    .add()
    .toFront();
}

Highcharts.chart('container', {
  chart: {
    events: {
      load() {
        const chart = this,
          container = chart.container;

        let cursorCircle;
        chart.renderCircle = renderCircle;
        chart.clickedPos = [];
        chart.savedCircles = [];

        // render circle moving with cursor:
        container.onmousemove = (e) => {
          const x = e.layerX,
            y = e.layerY;
          if (cursorCircle) {
            cursorCircle.attr({ x, y });
          } else {
            cursorCircle = chart.renderCircle(x, y);
          }
        };

        // avoid cursor circle sticking to chart:
        container.onmouseleave = () => {
          if (cursorCircle) {
            cursorCircle.hide();
          }
        };

        container.onmouseenter = () => {
          if (cursorCircle) {
            cursorCircle.show();
          }
        };
      },

      click(e) {
        const chart = this,
          x = e.chartX,
          y = e.chartY,
          xVal = chart.xAxis[0].toValue(x),
          yVal = chart.yAxis[0].toValue(y);

        // save clicked position for use in redraw():
        chart.clickedPos.push({ x: xVal, y: yVal });

        // render circle and push to array for use in redraw():
        chart.savedCircles.push(chart.renderCircle(x, y));
      },
      redraw() {
        // make sure circles are repositioned appropriately when resizing
        const chart = this,
          xAxis = chart.xAxis[0],
          yAxis = chart.yAxis[0];

        chart.savedCircles.forEach((circle, i) => {
          const { x, y } = chart.clickedPos[i];
          circle.attr({
            x: xAxis.toPixels(x),
            y: yAxis.toPixels(y)
          });
        });
      }
    }
  },
  series: [
    {
      data: [
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4
      ]
    }
  ]
});
