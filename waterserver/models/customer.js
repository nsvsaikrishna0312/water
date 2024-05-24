const mongoose=require('mongoose');
const customermodel=new mongoose.Schema({
customername:String,
password:String,
phonenumber:Number,
address:String});

module.exports=mongoose.model('customer',customermodel)