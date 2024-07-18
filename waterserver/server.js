const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const CustomerRouter = require('./routers/customerroute');
const DriverRouter = require('./routers/driverrouter');
const ItemRouter = require('./routers/itemrouter');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://nsaikrishna:sai2004@cluster0.2ifjzcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1); // Exit process on connection error
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

app.use('/api/customer', CustomerRouter);
app.use('/api/driver', DriverRouter);
app.use('/api/item', ItemRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
