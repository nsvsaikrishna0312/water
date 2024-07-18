const mongoose=require('mongoose');
const itemmodel=new mongoose.Schema({
itemname:String,
itemimageurl:String,
price:Number});

module.exports=mongoose.model('item',itemmodel)