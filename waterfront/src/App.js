
import './App.css';

import Home from './ui/home';
import AddCustomer from "./ui/addcustomer";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddDriver from "./ui/adddriver";
import DriverView from "./ui/driverview";

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addcustomer" element={<AddCustomer/>}/>
      <Route path="/adddriver" element={<AddDriver/>}/>
      <Route path="/driver" element={<DriverView/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
