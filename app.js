var express=require("express");
var app = express();
var exphbs=require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var io=require("socket.io")();
var yahooFinance=require("./config/yahooFinance")

var server=app.listen(process.env.PORT||8080,function(){
	console.log("Serving ....");
}) 

require("dotenv").config();

mongoose.connect(process.env.mongoURI);

app.use(bodyParser.urlencoded({ extended: true}))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use("/public", express.static(__dirname+'/public'));
app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
})

io.attach(server)

var connections=0;
var stocks={};//global serverside object

io.sockets.on('connection',function(socket){
	connections+=1;
	
	socket.emit("initialize",{stocks:stocks})
	io.sockets.emit("new user",{connections:connections})

	socket.once('disconnect',function(){
		connections-=1;
	})

	socket.on("fetch",function(_symbol){
		yahooFinance(_symbol,function(err,data){

			stocks[_symbol.toUpperCase()]=data;
			io.sockets.emit("result",{result:data,symbol:_symbol})
			
		});
	})
	socket.on("remove item",function(data){
		delete stocks[data.symbol];
		io.sockets.emit("sync delete",{symbol:data.symbol})
	})
})










