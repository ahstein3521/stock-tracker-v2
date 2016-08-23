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
var stocks={};//global serverside object

io.sockets.on('connection',function(socket){
	
	if(connections==0){
		db.initial(function(err,data){
			if(!err){
				stocks=data;
			}
		})
	}	
	
	socket.emit("initialize",{stocks:stocks})
	
	connections+=1;	
	
	socket.once('disconnect',function(){
		connections-=1;
	})

	socket.on("fetch",function(_symbol){
		yahooFinance(_symbol,function(err,data){
			db.save(_symbol)
			stocks[_symbol.toUpperCase()]=data;
			io.sockets.emit("result",{result:data,symbol:_symbol})
			
		});
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