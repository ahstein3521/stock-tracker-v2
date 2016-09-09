function renderChart(){
    if(!stocks) return;
    $(".chart").highcharts('StockChart',{
        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        legend: {
            enabled: true,
            align: 'bottom',
            backgroundColor: '#FCFFC5',
            borderColor: "rgb(161, 171, 66)",
            borderWidth: 2,
            verticalAlign: 'bottom',
            shadow:true
        },       
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                compare: 'percent',
                events:{legendItemClick:handleDelete}
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2
        },

        series: Object.keys(stocks).map(function(v){
            return {name:v,data:format(stocks[v])}
        })
    })
}
