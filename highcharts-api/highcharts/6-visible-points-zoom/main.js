let customLabel, circles, currentMax, labelsRendered;

const isMax = (value, max) => value === max;

const updateLabels = function (chart, curMax) {
  chart.update(
    {
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            color: 'red',
            style: {
              textOutline: 'none'
            },
            formatter() {
              return isMax(this.y, curMax) ? this.y : null;
            }
          }
        }
      }
    },
    false
  );
};

const renderCustomLabel = (chart, n) =>
  chart.renderer.text(`Visible points: ${n}`, 50, chart.chartHeight - 20).add();

const getSelectionMaxPointsX = function (points, curMax) {
  const selectionMaxPointsX = [];
  points.forEach((point) => {
    if (isMax(point.y, curMax)) {
      selectionMaxPointsX.push(point.x);
    }
  });
  return selectionMaxPointsX;
};

Highcharts.chart('container', {
  chart: {
    zoomType: 'xy',
    zooming: {
      resetButton: {
        position: {
          y: -50
        }
      }
    },
    events: {
      render() {
        const chart = this,
          points = chart.series[0].points, // all points
          visiblePoints = chart.series[0].getValidPoints(points, true), // visible points
          n = visiblePoints.length; // number of visible points

        currentMax = Math.max(...visiblePoints.map((o) => o.y));

        // Get x-values for max points in selection
        const selectionMaxPointsX = getSelectionMaxPointsX(
          visiblePoints,
          currentMax
        );

        // Render custom label, indicating n number of datapoints in view
        if (customLabel) {
          customLabel.destroy();
        }
        customLabel = renderCustomLabel(chart, n);

        // Render value labels
        if (!labelsRendered) {
          updateLabels(chart, currentMax);
          labelsRendered = true;
          chart.redraw();
          labelsRendered = false;
        }

        // Add circles
        if (circles) {
          circles.destroy();
        }
        circles = chart.renderer.g().add().toFront();

        const yMin = chart.yAxis[0].getExtremes().min;

        selectionMaxPointsX.forEach( (el) => chart.renderer
              .circle(chart.xAxis[0].toPixels(el), chart.yAxis[0].toPixels(yMin) + 0.5, 3)
              .attr({ fill: 'red' }).add(circles)
        );
      }
    }
  },
  series: [
    {
      data: [
        14, 5, 67, 49, 74, 21, 70, 61, 34, 85, 42, 73, 6, 43, 19, 63, 38, 41, 6,
        9, 67, 1, 68, 95, 39, 88, 45, 46, 85, 84, 28, 40, 82, 17, 17, 70, 92, 4,
        22, 37, 3, 93, 85, 6, 60, 70, 1, 31, 43, 91, 96, 31, 60, 62, 48, 55, 70,
        13, 60, 51, 70, 81, 88, 97, 35, 52, 24, 86, 40, 97, 53, 87, 92, 76, 56,
        34, 19, 78, 89, 98, 40, 40, 80, 9, 15, 98, 9, 60, 50, 50, 18, 60, 70,
        70, 2, 19, 37, 65, 30, 43
      ]
    }
  ]
});
