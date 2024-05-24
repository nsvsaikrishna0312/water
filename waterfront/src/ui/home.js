import React, { useState, useEffect } from 'react';
import NavBarDesign from './navbar';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({});

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
    height: '200px',
    width: '200px',
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <NavBarDesign />
      <h1 style={{
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '0px',
        borderRadius: '30px',
        fontSize: '3em',
        marginTop: '10px',
        marginLeft: '200px',
        marginRight: '200px'
      }}>Customer</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/addcustomer" style={{ textDecoration: 'none' }}>
          <AddIcon style={{
            color: '#ffffff',
            backgroundColor: '#799351',
            borderRadius: '10px',
            fontSize: '40px',
            alignContent: 'right',
            width: '100px',
            marginRight: '40px',
            height: '50px'
          }} />
        </Link>
      </div>

      <div style={containerStyle}>
        {customers.map(customer => (
          <div key={customer._id} style={cardStyle}>
            <div style={{ height: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <DeleteIcon
                style={{ cursor: 'pointer', marginRight: '12px' }}
                onClick={() => handleOpenDeleteDialog(customer)}
              />
              <EditIcon
                style={{ cursor: 'pointer' }}
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
