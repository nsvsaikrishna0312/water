const mongoose=require('mongoose');
const ordermodel=new mongoose.Schema({
    orderId: {type: String, required: true, unique: true,},
    date: {type: Date, default: Date.now,},
    order_name:String,
    quantity:Number,
    total_cost:Number,
    customer_name:String,
    customer_phonenumber:Number,
    customer_address:String,
    driver_name:String,
    driver_phonenumber:Number,
    vehical_number:String,
    owner_phonenumber:Number,
    delivery_status:String,




});

module.exports=mongoose.model('order',ordermodel)