
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