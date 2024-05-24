import React, {useState} from 'react';
import NavBarDesign from "./navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useNavigate} from "react-router-dom";
import {Button, MenuItem, Paper, Select, Stack, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

export default function AddDriver() {
     const navigate = useNavigate();
      const [NewDriver, setNewDriver] = useState({
    drivername: '',
    password: '',
    phonenumber: '',
    address: '',
    vehiclenumber:''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDriver({
      ...NewDriver,
      [name]: value
    });
  };
     const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

     const handleSubmit = () => {
    // Check if any field is empty
    for (const key in NewDriver) {
      if (NewDriver[key] === '') {
        toast.error('Please fill in all fields.');
        return;  // Stop the function if any field is empty
      }
    }
    if (NewDriver.password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // All fields are filled, proceed to submit
    axios.post('http://localhost:5000/api/driver', NewDriver)

      .then((res) => {
        console.log('Data posted successfully:', res.data);
        toast.success('Driver added successfully!');
        setNewDriver({
          drivername: '',
          password: '',
          phonenumber: '',
          address: '',
            vehiclenumber: ''

        });
        navigate('/driver');
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


          }}><Link to="/driver">
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

              }}>Add Driver</h1>
          </div>
<div style={{marginLeft:'370px'}}>

              <Paper elevation={8} sx={{width: '60%', p: 4, borderRadius: 2, textAlign: 'center', marginRight: 15}}>
                  <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                      <TextField
                          label="Driver Name"
                          name="drivername"
                          value={NewDriver.drivername}
                          onChange={handleInputChange}
                      />
                      <TextField
                          label="Phone Number"
                          name="phonenumber"
                           value={NewDriver.phonenumber}
                          onChange={handleInputChange}

                      />
                      <TextField type="password"
                          label="Password"
                          variant="outlined" required fullWidth
                          name="password"
                          value={NewDriver.password}
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
                          value={NewDriver.address}
                          onChange={handleInputChange}

                      />
                      <TextField
                          label="Vehical Number"
                          variant="outlined"
                          name="vehiclenumber"
                          value={NewDriver.vehiclenumber}
                          onChange={handleInputChange}

                      />


                      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                          Add Driver
                      </Button>
                  </form>
              </Paper>
    <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
      </div>
  );
}
