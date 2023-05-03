const data = [
  { y: 60, name: 'Commerce' },
  { y: 20, name: 'Engineering' },
  { y: 15, name: 'Financial Services' },
  { y: 10, name: 'Logistics, Aviation & Shipping' },
  { y: 5, name: 'Seafood & Marine' },
  { y: 2, name: 'Corporate Services & Others' }
];

// Modifying tooltip hide prototype
const H = Highcharts,
  U = H._modules['Core/Utilities.js'],
  { pick, syncTimeout } = U;

H.Tooltip.prototype.hide = function (delay) {
  const otherTooltips = this.chart.otherTooltips,
    tooltip = this;
  U.clearTimeout(tooltip.hideTimer);
  delay = pick(delay, tooltip.options.hideDelay);
  if (!tooltip.isHidden) {
    tooltip.hideTimer = syncTimeout(function () {
      otherTooltips.forEach((t) => {
        t.getLabel().fadeOut(delay ? void 0 : delay);
        t.isHidden = true;
      });
      tooltip.getLabel().fadeOut(delay ? void 0 : delay);
      tooltip.isHidden = true;
    }, delay);
  }
};

Highcharts.chart('container', {
  chart: {
    type: 'pie',
    events: {
      load() {
        let chart = this;

        // Create other tooltip(s)
        chart.otherTooltips = chart.series.slice(1).map(() => new Highcharts.Tooltip(
                chart, Highcharts.merge(chart.options.tooltip)
              )
          );
      }
    }
  },
  tooltip: {
    split: true
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: false
      },
      point: {
        events: {
          legendItemClick() {
            const name = this.name,
              series = this.series.chart.series;
              // toggle visibility of other series points
            series.slice(1).forEach((series) => series.data.forEach((point) => {
              point.name === name && point.setVisible();
            }));
          },
          mouseOver() {
            const point = this,
            chart = point.series.chart,
            otherSeries = chart.series.filter(
              (series) => series !== point.series
            ),
            otherPoints = otherSeries.map((series) =>
              series.points.find((p) => p.name === point.name)
            );
            // refresh point tooltips and set hover state
            chart.otherTooltips.forEach((tooltip, i) => {
              tooltip.refresh(otherPoints[i]);
              otherPoints[i].setState('hover');
            });
          }
        }
      }
    }
  },
  series: [
    {
      data,
      center: ['30%', '50%'],
      size: '50%',
      showInLegend: true // true for "main" series
    },
    {
      data,
      center: ['70%', '50%'],
      size: '50%'
    }
  ]
});
