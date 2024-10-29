
if (document.getElementById('container-1')){
    Highcharts.chart('container-1', {
        chart: {
            type: 'column',
            animation: false
        },
        title: {
            align: 'left',
            text: 'Cantidad de dispositivos por tipo',
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Número de dispositivos'
            },
            allowDecimals: false,
            tickInterval: 1   
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'  // Muestra solo el número sin porcentaje
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.0f}</b> total<br/>'  // Tooltip con número absoluto
        },
        series: [
            {
                name: 'Dispositivos',
                colorByPoint: true,
                data: []
            }
        ],
    });

    fetch('http://localhost:5000/get-stats-dispositivos')
        .then(response => response.json())
        .then(data => {
            let seriesDevice = data.map(item => ({ name: item.category, y: item.quantity, drilldown: null }));

            // Get the chart by ID
            const chart = Highcharts.charts.find((chart) => chart && chart.renderTo.id === "container-1");

            // Update the chart with new data
            chart.update({
                series: [
                    {
                        data: seriesDevice,
                    },
                ],
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

if (document.getElementById('container-2')) {
    Highcharts.chart('container-2', {
        chart: {
            type: 'column',
            animation: false
        },
        title: {
            align: 'left',
            text: 'Cantidad de contactos por comuna',
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Número de contactos'
            },
            allowDecimals: false,
            tickInterval: 1   
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'  // Muestra solo el número sin porcentaje
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.0f}</b> total<br/>'  // Tooltip con número absoluto
        },
        series: [
            {
                name: 'Contactos',
                colorByPoint: true,
                data: []
            }
        ],
    });

    fetch('http://localhost:5000/get-stats-contactos')
        .then(response => response.json())
        .then(data => {
            let seriesContact = data.map(item => ({ name: item.comuna, y: item.quantity, drilldown: null }));

            // Get the chart by ID
            const chart = Highcharts.charts.find((chart) => chart && chart.renderTo.id === "container-2");

            // Update the chart with new data
            chart.update({
                series: [
                    {
                        data: seriesContact,
                    },
                ],
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
}