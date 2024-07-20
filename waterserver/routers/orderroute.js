const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order.js');
const generateOrderId = require('../models/generateOrderId.js');
router.post('/',async(req,res)=>{

try{
     const order=new OrderModel(req.body);
     await order.save();
     res.status(200).json(order);
}catch(err){
 res.status(500).json({message:err.message});
}

});