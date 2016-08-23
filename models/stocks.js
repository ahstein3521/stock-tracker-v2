var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var symbolSchema=new Schema({symbol:String})

module.exports=mongoose.model("Stock",symbolSchema);