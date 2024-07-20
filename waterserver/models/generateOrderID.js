// utils/generateOrderId.js

const Counter = require('../models/Counter');

const generateOrderId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: 'orderId' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `ORD-${year}${month}${day}-${counter.value}`;
};

module.exports = generateOrderId;
