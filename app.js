var express=require("express");
var app = express();
var mongoose = require('mongoose');
var io=require("socket.io")();
var yahooFinance=require("./config/yahooFinance")
var db=require("./config/sessionlog");

var server=app.listen(process.env.PORT||8080,function(){
	console.log("Serving ....");
}) 

require("dotenv").config();

mongoose.connect(process.env.mongoURI);

app.use("/public", express.static(__dirname+'/public'));
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
})

io.attach(server)

var connections=0;
var stocks=null;//global obj to keep track of state

io.sockets.on('connection',function(socket){
	connections+=1;
	
	if(connections==1 && !stocks){
		db.initial(function(err,data){
			if(!err){
				stocks=data;
				socket.emit("initialize",{stocks:stocks})
			}
		})
	}	
		
	socket.emit("initialize",{stocks:stocks})
	
	
	io.sockets.emit("display connections",{connections:connections})
	socket.once('disconnect',function(){
		connections-=1;
		io.sockets.emit("display connections",{connections:connections})
	})

	socket.on("fetch",function(_symbol){
		var symbol=_symbol.toUpperCase();
		yahooFinance(symbol,function(err,data){
			if(!err){
				db.save(symbol)
				stocks[symbol]=data;
			}
				io.sockets.emit("result",{result:data,symbol:symbol,error:err})
		})
	})
	socket.on("remove item",function(data){
		delete stocks[data.symbol];
		db.remove(data.symbol,function(err){
			if(!err){
				io.sockets.emit("sync delete",{symbol:data.symbol})
			}
				
		})
	})
})