Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        events: {
            load() {
                const chart = this;
                chart.showHideChildren = function (el) {
                    if (el.toNode.isHidden) {
                        el.graphic.show();
                        el.toNode.graphic.css({
                            opacity: 1
                        });
                        el.toNode.dataLabel.css({ opacity: 1 });
                        el.toNode.isHidden = false;
                        console.log(el);
                        el.toNode.dataLabel.element.style.visibility =
                            'visible';
                    } else {
                        el.graphic.hide();
                        el.toNode.graphic.css({
                            opacity: 0
                        });
                        el.toNode.dataLabel.css({ opacity: 0 });
                        el.toNode.isHidden = true;
                    }
                };
                chart.series[0].points.forEach((point) => {
                    chart.showHideChildren(point);
                });

                const dataLabels = Array.from(
                    chart.series[0].dataLabelsGroup.element.children
                );

                dataLabels.forEach(
                    (el, i) =>
                        (el.style.visibility = i != 1 ? 'hidden' : 'visible')
                );
            }
        }
    },
    plotOptions: {
        networkgraph: {
            inactiveOtherPoints: false,
            keys: ['from', 'to'],
            layoutAlgorithm: {
                integration: 'verlet'
            },
            states: {
                hover: {
                    enabled: false
                }
            }
        }
    },
    tooltip: {
        enabled: false
    },
    title: {
        text: 'Family tree of Mieszko II Lambert (990 - 1034), King of Poland'
    },
    series: [
        {
            marker: {
                radius: 20
            },
            dataLabels: {
                enabled: true,
                linkFormat: '',
                style: {
                    fontSize: 12
                }
            },
            point: {
                events: {
                    click() {
                        const point = this,
                            chart = this.series.chart;
                        point.linksFrom.forEach((link) => {
                            chart.showHideChildren(link);
                        });
                    }
                }
            },
            data: [
                ['Mieszko II Lambert', 'Father'],
                ['Mieszko II Lambert', 'Mother'],
                ['Mieszko II Lambert', 'Spouse'],
                ['Mieszko II Lambert', 'Brother'],
                ['Mieszko II Lambert', 'Sister'],
                ['Mieszko II Lambert', 'Son'],
                ['Mieszko II Lambert', 'Daughter'],
                ['Father', 'Bolesław I the Brave'],
                ['Mother', 'Emnilda of Lusatia'],
                ['Spouse', 'Richeza of Lotharingia'],
                ['Brother', 'Otto Bolesławowic'],
                ['Sister', 'Regelinda, Margravine of Meissen'],
                ['Sister', 'Name unknown, abbess'],
                ['Sister', 'Name unknown, Grand Princess of Kiev'],
                ['Son', 'Casimir I, Duke of Poland'],
                ['Son', 'Bolesław the Forgotten'],
                ['Daughter', 'Gertruda, Grand Princess of Kiev'],
                ['Daughter', 'Richeza, Queen of Hungary']
            ]
        }
    ]
});
