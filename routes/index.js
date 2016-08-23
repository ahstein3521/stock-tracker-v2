var fetchStock=require("../config/yahooFinance")

module.exports=function(app,symbols){
	app.get("/",function(req,res){
		res.render("home",{title:"Stock Tracker"})		
	})
	app.get("/stock",function(req,res){
		var symbol=req.query.symbol
		symbols.push(symbol);
		console.log(symbols)
		fetchStock(symbol,function(err,quotes){
			if(err || !quotes.length) return res.redirect("/")
			res.send(quotes);
		})
	})
}

// res.render("home", {stocks:quotes,symbol:req.query.symbol}); 