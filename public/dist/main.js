
$(function(){
	$('form').submit(function(e){
		e.preventDefault();
		var symbol=$("input[type='text']").val();
		if(!symbol) return;
		socket.emit("fetch",symbol)
		$("input[type='text']").val("")
	})
	
	socket.on("initialize",function(data){
		stocks=data.stocks;
		
		Object.keys(stocks).forEach(v=> addDataCard(stocks[v]));

		renderChart();
	})

	

	socket.on("new user",function(data){
		displayNumOfConnections(data.connections)
	})

	socket.on("result",function(data){
		var chart = $('.chart').highcharts();		
		if(data.result.length){
			stocks[data.symbol]=data.result;
			addDataCard(data.result);
			chart.addSeries({
				name:data.symbol,
				data:format(data.result)
			})
		}
	})
	socket.on("sync delete",function(data){
		deleteStock(data.symbol);
		delete stocks[data.symbol]
	})
})	
function renderChart(){
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
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                compare: 'percent'
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

$('form').submit(function(e){
	e.preventDefault();
	var symbol=$("input[type='text']").val();
	if(!symbol) return;
	socket.emit("fetch",symbol)
	$("input[type='text']").val("")
})

$(document).on("click",".close",function(){
	deleteStock($(this).attr("id"))
	socket.emit("remove item",{symbol:$(this).attr("id")})
})

function deleteStock(symbol){
	var chart=$(".chart").highcharts();

	chart.series.forEach(function(series){

		if(series.name.toUpperCase()==symbol){
			series.remove(true);
			$("#"+symbol).parent().hide();
		}
	})
}

function format(data){
	return data.map(v=>{return [Date.parse(v.date),v.close]});
}

function displayNumOfConnections(num){
	$(".header h4 span").text(num);
}

function addDataCard(data){
	data=data.pop();
	var str="<div class='card'><div class='close' id='"+data.symbol.toUpperCase()+"'>X</div></p><strong>"+data.symbol.toUpperCase()+"</strong></p>"+
			"<p>"+data.close+"</p></div>";
		$(".cards").append(str);	
}			