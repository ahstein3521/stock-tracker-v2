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