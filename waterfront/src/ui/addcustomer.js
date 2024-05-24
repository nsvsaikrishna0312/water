import React, {useState} from 'react';
import NavBarDesign from "./navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {Button, MenuItem, Paper, Select, Stack, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from 'react-toastify'
import axios from "axios";
export default function AddCustomer() {
      const navigate = useNavigate();
      const [newCustomer, setNewCustomer] = useState({
    customername: '',
    password: '',
    phonenumber: '',
    address: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value
    });
  };
     const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

     const handleSubmit = () => {
    // Check if any field is empty
    for (const key in newCustomer) {
      if (newCustomer[key] === '') {
        toast.error('Please fill in all fields.');
        return;  // Stop the function if any field is empty
      }
    }
    if (newCustomer.password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // All fields are filled, proceed to submit
    axios.post('http://localhost:5000/api/customer', newCustomer)

      .then((res) => {
        console.log('Data posted successfully:', res.data);
        toast.success('Seller added successfully!');
        setNewCustomer({
          customername: '',
          password: '',
          phonenumber: '',
          address: '',

        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
      <div>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

          <NavBarDesign/>
          <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '-31px'


          }}><Link to="/">
              <ArrowBackIcon style={{
                  color: '#ffffff',
                  fontSize: '40px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  marginLeft: '20px',
                  backgroundColor: '#799351',
                  borderRadius: '10px'
              }}/></Link>
              <h1 style={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '30px',
                  fontSize: '3em',
                  width: '1000px',
                  marginLeft: '180px',
                  marginTop:'40px'

              }}>Add Customer</h1>
          </div>
<div style={{marginLeft:'370px'}}>

              <Paper elevation={8} sx={{width: '60%', p: 4, borderRadius: 2, textAlign: 'center', marginRight: 15}}>
                  <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                      <TextField
                          label="Customer Name"
                          name="customername"
                          value={newCustomer.customername}
                          onChange={handleInputChange}

                      />
                      <TextField
                          label="Phone Number"
                          name="phonenumber"
                          value={newCustomer.phonenumber}
                          onChange={handleInputChange}

                      />
                      <TextField type="password"
                          label="Password"
                          variant="outlined" required fullWidth
                          name="password"
                          value={newCustomer.password}
                          onChange={handleInputChange}

                      />
                      <TextField
                          type="password"
                          label="Confirm Password"
                          variant="outlined" required fullWidth
                          name="confirmpassword"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}


                      />
                      <TextField
                          label="Address"
                          variant="outlined"
                          name="address"
                          value={newCustomer.address}
                          onChange={handleInputChange}
                      />


                      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                          Add Customer
                      </Button>
                  </form>
              </Paper>
    <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
      </div>
  );
}
