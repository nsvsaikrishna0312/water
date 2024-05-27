import React, { useState, useEffect } from 'react';
import NavBarDesign from './navbar';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Stack,
  Box,
  Typography
} from '@mui/material';
import {Form, InputGroup} from "react-bootstrap";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({});
    const [search, setSearch] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/api/customer')
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching all data: ', error);
        setCustomers([]);
      });
  }, []);

  const handleOpenDeleteDialog = (customer) => {
    setCurrentCustomer(customer);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentCustomer(null);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/customer/${currentCustomer._id}`)
      .then((res) => {
        if (res.status === 200) {
          setCustomers(customers.filter(customer => customer._id !== currentCustomer._id));
          handleCloseDeleteDialog();
        } else {
          console.error('Failed to delete customer:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error deleting customer: ', error);
      });
  };

  const handleOpenEditDialog = (customer) => {
    setCurrentCustomer(customer);
    setEditedCustomer(customer);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentCustomer(null);
    setEditedCustomer({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:5000/api/customer/${currentCustomer._id}`, editedCustomer)
      .then((res) => {
        if (res.status === 200) {
          setCustomers(customers.map(customer =>
            customer._id === currentCustomer._id ? res.data : customer));
          handleCloseEditDialog();
        } else {
          console.error('Failed to update customer:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error updating customer: ', error);
      });
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '16px',
  };

  const cardStyle = {
    backgroundColor: '#E49BFF',
    height: '250px',
    width: '250px',
    padding: '19px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    fontSize: '18px',
    marginBottom: '8px',
  };

  const textStyle = {
    fontSize: '14px',
  };

  return (
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <NavBarDesign/>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{padding: '10px 200px', backgroundColor: '#f8f9fa'}}
        >
          <Box flexGrow={1} display="flex" justifyContent="center">
            <Typography
                variant="h1"
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '0px 20px',
                  borderRadius: '30px',
                  fontSize: '3em',
                  width: '500px',
                }}
            >
              Customer
            </Typography>
          </Box>
          <Box> {/* Added margin-left to move the icon to the right */}
            <div style={{justifyContent: 'flex-end', marginLeft: '100%'}}>
              <Link to="/addcustomer" style={{textDecoration: 'none'}}>
                <AddIcon
                    sx={{
                      color: '#ffffff',
                      backgroundColor: '#799351',
                      borderRadius: '10px',
                      fontSize: '40px',
                      width: '100px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                />
              </Link>
            </div>
          </Box>
        </Stack>
        <div style={{borderRadius: '5px', width: '95%', display: 'flex', justifyContent: 'center', margin: 'auto'}}>
          <Form style={{width: '100%'}}>
            <InputGroup style={{borderRadius: '5px', width: '100%'}}>
              <Form.Control
                  type="text"
                  placeholder="Search Customers"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  // Centering the text and placeholder
              />
            </InputGroup>
          </Form>
        </div>


        <div style={containerStyle}>
          {customers
              .filter((customer) => {
                    const lowerSearch = search.toLowerCase();
                    return (
                      lowerSearch === '' ||
                      customer.customername.toLowerCase().includes(lowerSearch) ||
                      customer.phonenumber.toString().includes(lowerSearch) || // Convert phone number to string before comparison
                      customer.address.toLowerCase().includes(lowerSearch)
                    );
                  })
              .map((customer) => (
                  <div key={customer._id} style={cardStyle}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                      <DeleteIcon
                          style={{cursor: 'pointer', marginRight: '12px'}}
                          onClick={() => handleOpenDeleteDialog(customer)}
                      />
                      <EditIcon
                          style={{cursor: 'pointer'}}
                          onClick={() => handleOpenEditDialog(customer)}
                      />
                    </div>
                    <h5 style={titleStyle}>{customer.customername}</h5>
                    <p style={textStyle}>Phone Number: {customer.phonenumber}</p>
                    <p style={textStyle}>Address: {customer.address}</p>
                  </div>
              ))}
        </div>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Customer</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this customer?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
            <Button onClick={handleDelete} color="primary">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
                fullWidth
                label="Customer Name"
                name="customername"
                value={editedCustomer.customername || ''}
                onChange={handleEditChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phonenumber"
                value={editedCustomer.phonenumber || ''}
                onChange={handleEditChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Address"
                name="address"
                value={editedCustomer.address || ''}
                onChange={handleEditChange}
                margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
