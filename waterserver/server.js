const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const CustomerRouter = require('./routers/customerroute');
const DriverRouter=require('./routers/driverrouter')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MONGO_URI = 'mongodb+srv://nsaikrishna:sai2004@cluster0.2ifjzcb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error'));




app.use('/api/customer', CustomerRouter);
app.use('/api/driver', DriverRouter);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});



