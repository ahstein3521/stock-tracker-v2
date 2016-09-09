$(document).on("ready",function(){
	$(function(){	
		
		socket.on("initialize",function(data){
			stocks=data.stocks;
			$(".connections").text(data.connections)
			renderChart();
		})

		socket.on("display connections",function(data){
			console.log(data);
			$(".connections").text(data.connections)
		})

		socket.on("result",function(data){
			var chart = $('.chart').highcharts();
					
			if(data.error || !data.result){
				return alert("Couldn't Fetch "+data.symbol)
			}else{
				stocks[data.symbol]=data.result;
				chart.addSeries({
					name:data.symbol,
					data:format(data.result)
				})
			}
		})
		socket.on("sync delete",function(data){
			emitDeletion(data.symbol);
			delete stocks[data.symbol]
		})
	})	
})