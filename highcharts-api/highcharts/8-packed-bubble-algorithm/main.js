randomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

// TASK 1
const chart1 = Highcharts.chart('container-1', {
  chart: {
    type: 'packedbubble'
  },
  title: {
    text: 'Task 1'
  },
  plotOptions: {
    packedbubble: {
      layoutAlgorithm: {
        splitSeries: true,
        dragBetweenSeries: true
      }
    }
  },
  series: [
    {
      name: 'Rando 1',
      data: [...Array(3)].map(() => Math.floor(Math.random() * 100) + 1)
    },
    {
      name: 'Rando 2',
      data: [...Array(10)].map(() => Math.floor(Math.random() * 100) + 1)
    }
  ]
});

// TASK 1 - NOTES
// I solved the bubble movement by simply setting dragBetweenSeries to true, but I am not sure if this was enough, or if the bubbles should move automatically without even using mouse drag&drop. If that is the case, I need a hint.

// TASK 2
const chart2 = Highcharts.chart('container-2', {
  chart: {
    type: 'packedbubble',
    events: {
      load() {
        const chart = this,
          points = chart.series[0].points,
          prevNeighbours = [],
          loop = () => {
            points.forEach((point, i) => {
              if (
                point.neighbours !== prevNeighbours[i] &&
                point.neighbours !== 0
              ) {
                point.color = randomColor();
                prevNeighbours[i] = point.neighbours;
              }
              if (point.neighbours === 0 && prevNeighbours[i] !== 0) {
                prevNeighbours[i] = 0;
              }
            });
            setTimeout(loop);
          };
        loop();
      }
    }
  },
  title: {
    text: 'Task 2'
  },
  plotOptions: {
    packedbubble: {
      layoutAlgorithm: {
        splitSeries: false
      }
    }
  },
  series: [
    {
      name: 'Rando',
      data: [...Array(3)].map(() => Math.floor(Math.random() * 10) + 1)
    }
  ]
});

// TASK 2 - NOTES
// Solved using setTimeout() to loop over every event cycle and check the number of neighbours per point in each event cycle. For each point: if the number of neighbours are not the same as in the previous loop and not 0, then the point color changes and the current number of neighbours is stored for the next loop. If the number of neighbours is 0 in the current loop but not in the previous loop, the color does not change, but the number of neighbours for the point is set to 0 for the next loop.

// TASK 3
const chart3 = Highcharts.chart('container-3', {
  chart: {
    type: 'packedbubble',
    events: {
      load() {
        const chart = this,
          series = chart.series,
          prevNeighbours = [],
          loop = () => {
            series.forEach((series, i) => {
              if (
                series.parentNode.neighbours !== prevNeighbours[i] &&
                series.parentNode.neighbours !== 0
              ) {
                series.color = series.parentNode.color = randomColor();
                prevNeighbours[i] = series.parentNode.neighbours;
              }
              if (
                series.parentNode.neighbours === 0 &&
                prevNeighbours[i] !== 0
              ) {
                prevNeighbours[i] = 0;
              }
            });
            setTimeout(loop);
          };
        loop();
      }
    }
  },
  title: {
    text: 'Task 3'
  },
  plotOptions: {
    packedbubble: {
      layoutAlgorithm: {
        splitSeries: true
      },
      events: {
        mouseOut: () => false,
        mouseOver: () => false,
        select: () => false
      },
      parentNode: {
        allowPointSelect: false
      }
    }
  },
  series: [
    {
      name: 'Rando 1',
      data: [...Array(3)].map(() => Math.floor(Math.random() * 10) + 1)
    },
    {
      name: 'Rando 2',
      data: [...Array(10)].map(() => Math.floor(Math.random() * 10) + 1)
    },
    {
      name: 'Rando 3',
      data: [...Array(5)].map(() => Math.floor(Math.random() * 10) + 1)
    }
  ]
});

// TASK 3 - NOTES
// The solution is the same as for task 2, but applied to parentNodes, so I made several series, and the loop function is a bit different.

// TASK 4
// I would like to solve this one too, but will need a push in the right direction to get started!
