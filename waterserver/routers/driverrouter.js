const express=require('express');
const router=express.Router();
const DriverModel=require('../Models/driver.js');


router.post('/',async(req,res)=>{

try{
     const driver=new DriverModel(req.body);
     await driver.save();
     res.status(200).json(driver);
}catch(err){
 res.status(500).json({message:err.message});
}

});

router.get('/', async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.json(drivers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const driver = await DriverModel.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const driver = await DriverModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports=router;
