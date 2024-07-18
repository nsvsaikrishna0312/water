import React, {useState} from 'react';
import NavBarDesign from "./navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, MenuItem, Paper, Select, Stack, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

export default function AddItem() {
     const navigate = useNavigate();
      const [NewItem, setNewItem] = useState({
         itemname:'',
          itemimageurl:'',
          price:''


  });

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({
      ...NewItem,
      [name]: value
    });
  };


     const handleSubmit = () => {
    // Check if any field is empty
    for (const key in NewItem) {
      if (NewItem[key] === '') {
        toast.error('Please fill in all fields.');
        return;  // Stop the function if any field is empty
      }
    }


    // All fields are filled, proceed to submit
    axios.post('http://localhost:5000/api/item', NewItem)

      .then((res) => {
        console.log('Data posted successfully:', res.data);
        toast.success('Item added successfully!');
        setNewItem({
         itemname:'',
          itemimageurl:'',
          price:''

        });
        navigate('/admin/item');
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
    <Link to="/admin/item" style={{ textDecoration: 'none' }}>
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
      Add Item
    </Typography>
  </Box>

</Stack>
<div style={{marginLeft:'25%',marginTop:'5%'}}>

              <Paper elevation={8} sx={{width: '70%', p: 4, borderRadius: 2, textAlign: 'center', marginRight: 15}}>
                  <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                      <TextField
                          label="Item Name"
                          name="itemname"
                          value={NewItem.itemname}
                          onChange={handleInputChange}
                      />
                      <TextField
                          label="Image URL"
                          name="itemimageurl"
                           value={NewItem.itemimageurl}
                          onChange={handleInputChange}

                      />

                      <TextField
                          label="Price"
                          variant="outlined"
                          name="price"
                          value={NewItem.price}
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
