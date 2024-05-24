const mongoose=require('mongoose');
const drivermodel=new mongoose.Schema({
drivername:String,
password:String,
phonenumber:Number,
address:String,
vehiclenumber:String});

module.exports=mongoose.model('driver',drivermodel)