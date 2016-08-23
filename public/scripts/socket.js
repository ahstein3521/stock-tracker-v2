$(function(){	
	socket.on("initialize",function(data){
		stocks=data.stocks;
		
		Object.keys(stocks).forEach(v=> addDataCard(stocks[v]));

		renderChart();
	})

	socket.on("result",function(data){
		var chart = $('.chart').highcharts();		
		console.log(data)
		if(data.error || !data.result){
			return alert("Couldn't Fetch "+data.symbol)
		}else{
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