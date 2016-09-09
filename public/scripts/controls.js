$('.form-search').submit(function(e){
	e.preventDefault();
	var symbol=$("#search-stock").val();
	
	if(!symbol||formIsEmpty()||symbolIsntUnique(symbol)){
 		$("#search-stock").val("");
 		return;
	}
	else{
		socket.emit("fetch",symbol);
		$("#search-stock").val("");
	}
})

function format(data){
	return data.map(v=>{return [Date.parse(v.date),v.close]});
}

function symbolIsntUnique(symbol){
	symbol=symbol.toUpperCase();
	var currentSymbols=Object.keys(stocks);
	return currentSymbols.indexOf(symbol)!=-1;
}

function formIsEmpty(){
	var symbol=$("#search-stock").val();
	return symbol.trim().length<1;
}

function handleDelete(event){	
	var name=event.target.name;
	var visible=event.target.visible;
	if(!visible) return;	
	
	if(confirm("Do you want to delete "+name+" from the chart?")){
		socket.emit("remove item",{symbol:name})
	}
}

function emitDeletion(symbol){
	var chart = $('.chart').highcharts();
	chart.series.forEach(function(s){
		if(s.name.toUpperCase()==symbol){
			s.remove(true);
		}
	})
}