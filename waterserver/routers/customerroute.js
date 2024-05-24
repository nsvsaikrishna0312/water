const express=require('express');
const router=express.Router();
const CustomerModel=require('../Models/customer.js');


router.post('/',async(req,res)=>{

try{
     const customer=new CustomerModel(req.body);
     await customer.save();
     res.status(200).json(customer);
}catch(err){
 res.status(500).json({message:err.message});
}

});

router.get('/', async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    res.json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports=router;
