var Stocks=require("../models/stocks")
var yahooFinance=require("./yahooFinance")

exports.save=function(_symbol){
 	var stock=new Stocks({symbol:_symbol})
 	stock.save();
}

exports.remove=function(id,callback){
	Stocks.remove({symbol:id},function(err,data){
		if(err){ return callback(err)}
	    return callback(null)
	})
}

exports.show=function(callback){
	Stocks.find({},function(err,data){
		return callback(data)
	})
}

exports.initial=function(callback){
	
	Stocks.find({},function(err,data){
		if(err) return callback(err);
		 var stocks={}
		data.forEach((v,i)=>{
			
			yahooFinance(v.symbol,function(err,result){
				
				stocks[v.symbol]=result;
				if(i==data.length-1) return callback(null,stocks)
				
			})
		})	
	})
}