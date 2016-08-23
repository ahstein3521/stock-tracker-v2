var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var symbolSchema=new Schema({symbol:{type:String,uppercase:true}})

module.exports=mongoose.model("Stock",symbolSchema);