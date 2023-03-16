const isMax = (value, max) => value === max;

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
          n = visiblePoints.length, // number of visible points
          currentMax = Math.max(...visiblePoints.map((o) => o.y));

        // Render custom label
        chart.customLabel
          ? chart.customLabel.attr({ text: `Visible points: ${n}` })
          : chart.customLabel = chart.renderer.text(`Visible points: ${n}`, 50, chart.chartHeight - 20).add();

        // Render value labels
        if (!chart.labelsRendered) {
          points.forEach((point) => {
            point.update(
              { label: isMax(point.y, currentMax) ? point.y : null }, false
              );
            });

          chart.labelsRendered = true;
          chart.redraw();
          chart.labelsRendered = false;

          // Add circles
          if (chart.circles) {
            chart.circles.destroy();
          }

          chart.circles = chart.renderer.g().add().toFront();

          const yMin = chart.yAxis[0].getExtremes().min,
            selectionMaxPoints = points.filter((point) => point.label === point.y),
            selectionMaxPointsX = selectionMaxPoints.map((point) => point.x);

          selectionMaxPointsX.forEach((el) =>
            chart.renderer
              .circle(chart.xAxis[0].toPixels(el), chart.yAxis[0].toPixels(yMin) + 0.5, 3)
              .attr({ fill: 'red' }).add(chart.circles)
          );
        }
      }
    }
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        color: 'red',
        style: {
          textOutline: 'none'
        },
        formatter() {
          return this.point.label;
        }
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
