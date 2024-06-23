import React, {useState} from 'react';
import NavBarDesign from "./navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, MenuItem, Paper, Select, Stack, TextField, Typography} from "@mui/material";
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
          <Stack
  direction="row"
  alignItems="center"
  justifyContent="space-between"
  sx={{
    padding: { xs: '10px 10px', sm: '10px 30px', md: '10px 50px', lg: '10px 100px' },
    backgroundColor: '#f8f9fa'
  }}
>
             <Box display="flex" justifyContent="flex-start" sx={{ width: { xs: 'auto', md: 'auto' } }}>
    <Link to="/driver" style={{ textDecoration: 'none' }}>
      <ArrowBackIcon
        sx={{
          color: '#ffffff',
          backgroundColor: '#799351',
          borderRadius: '10px',
          fontSize: '40px',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: { xs: '20px', sm: '40px', md: '60px', lg: '80px' },
        }}
      />
    </Link>
  </Box>
  <Box flexGrow={1} display="flex" justifyContent="center">
    <Typography
      variant="h1"
      sx={{
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '0px 20px',
        borderRadius: '30px',
        fontSize: { xs: '1.5em', sm: '2em', md: '2.5em', lg: '3em' },
        width: { xs: '200px', sm: '300px', md: '400px', lg: '500px' },
      }}
    >
      Add Driver
    </Typography>
  </Box>

</Stack>
<div style={{marginLeft:'30%'}}>

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
