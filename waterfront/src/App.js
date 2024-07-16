
import './App.css';

import Home from './ui/home';
import AddCustomer from "./ui/addcustomer";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddDriver from "./ui/adddriver";
import DriverView from "./ui/driverview";
import Customer_dash from "./ui/customer_dash";
import Item from "./ui/item";
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addcustomer" element={<AddCustomer/>}/>
      <Route path="/adddriver" element={<AddDriver/>}/>
      <Route path="/admin/item" element={<Item/>} />
      <Route path="/driver" element={<DriverView/>}/>
       <Route path="/customerdash" element={<Customer_dash/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
