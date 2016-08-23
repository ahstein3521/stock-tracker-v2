var yahooFinance = require('yahoo-finance');

var _to=new Date();
var _from=new Date();
_from.setYear(_from.getFullYear()-1);



module.exports=function(symbol,cb){

	yahooFinance.historical({
		symbol: symbol,
		from: _from,
		  to: _to,
		}, function (err, quotes) {
		 if(err) return cb(err);

		 return cb(null,quotes);
	})
}
