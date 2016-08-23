var Stocks=require("../models/stocks")

exports.save=function(_symbol){
 	var stock=new Stocks({symbol:_symbol})
 	stock.save();
}

exports.remove=function(id,callback){
	Stocks.findByIdAndRemove({_id:id},function(err){
		if(err) return callback(err);
		return callback();
	})
}