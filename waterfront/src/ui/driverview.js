import React, {useEffect, useState} from 'react'
import NavBarDesign from './navbar';
import AddIcon from '@mui/icons-material/Add';
import Bg from './photo1.jpg'
import { Link} from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {InputGroup,Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function DriverView() {
    const [drivers, setDrivers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [editedDriver, setEditedDriver] = useState({});
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/api/driver')
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching all data: ', error);
        setDrivers([]);
      });
  }, []);

  const handleOpenDeleteDialog = (driver) => {
    setCurrentDriver(driver);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentDriver(null);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/driver/${currentDriver._id}`)
      .then((res) => {
        if (res.status === 200) {
          setDrivers(drivers.filter(driver => driver._id !== currentDriver._id));
          handleCloseDeleteDialog();
        } else {
          console.error('Failed to delete Driver:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error deleting driver: ', error);
      });
  };

  const handleOpenEditDialog = (driver) => {
    setCurrentDriver(driver);
    setEditedDriver(driver);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentDriver(null);
    setEditedDriver({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDriver({ ...editedDriver, [name]: value });
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:5000/api/driver/${currentDriver._id}`, editedDriver)
      .then((res) => {
        if (res.status === 200) {
          setDrivers(drivers.map(driver =>
            driver._id === currentDriver._id ? res.data : driver));
          handleCloseEditDialog();
        } else {
          console.error('Failed to update Driver:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error updating Driver: ', error);
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
  sx={{
    padding: { xs: '10px 20px', sm: '10px 50px', md: '10px 100px', lg: '10px 200px' },
    backgroundColor: '#f8f9fa'
  }}
>
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
      Driver
    </Typography>
  </Box>
  <Box display="flex" justifyContent="flex-end" sx={{ width: { xs: 'auto', md: 'auto' } }}>
    <Link to="/adddriver" style={{ textDecoration: 'none' }}>
      <AddIcon
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
          marginLeft: { xs: '20px', sm: '40px', md: '60px', lg: '80px' },
        }}
      />
    </Link>
  </Box>
</Stack>



          <div style={{borderRadius: '5px', width: '95%', display: 'flex', justifyContent: 'center', margin: 'auto'}}>
              <Form style={{width: '100%'}}>
                  <InputGroup style={{borderRadius: '5px', width: '100%'}}>
                      <Form.Control
                          type="text"
                          placeholder="Search Drivers"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          // Centering the text and placeholder
                      />
                  </InputGroup>
              </Form>
          </div>


          <div style={containerStyle}>
              {drivers
                  .filter((driver) => {
                    const lowerSearch = search.toLowerCase();
                    return (
                      lowerSearch === '' ||
                      driver.drivername.toLowerCase().includes(lowerSearch) ||
                      driver.phonenumber.toString().includes(lowerSearch) || // Convert phone number to string before comparison
                      driver.address.toLowerCase().includes(lowerSearch)
                    );
                  })

                  .map((driver) => (
                      <div key={driver._id} style={cardStyle}>
                          <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                              <DeleteIcon
                                  style={{cursor: 'pointer', marginRight: '12px'}}
                                  onClick={() => handleOpenDeleteDialog(driver)}
                              />
                              <EditIcon
                                  style={{cursor: 'pointer'}}
                                  onClick={() => handleOpenEditDialog(driver)}
                              />
                          </div>
                          <h5 style={titleStyle}>{driver.drivername}</h5>
                          <p style={textStyle}>Phone Number: {driver.phonenumber}</p>
                          <p style={textStyle}>Address: {driver.address}</p>
                          <p style={textStyle}>Vehicle Number: {driver.vehiclenumber}</p>
                      </div>
                  ))}
          </div>

          {/* Delete Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
              <DialogTitle>Delete Driver</DialogTitle>
              <DialogContent>
                  <p>Are you sure you want to delete this driver?</p>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                  <Button onClick={handleDelete} color="primary">Delete</Button>
              </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
              <DialogTitle>Edit Driver</DialogTitle>
              <DialogContent>
                  <TextField
                      fullWidth
                      label="Driver Name"
                      name="drivername"
                      value={editedDriver.drivername || ''}
                      onChange={handleEditChange}
                      margin="normal"
                  />
                  <TextField
                      fullWidth
                      label="Phone Number"
                      name="phonenumber"
                      value={editedDriver.phonenumber || ''}
                      onChange={handleEditChange}
                      margin="normal"
                  />
                  <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={editedDriver.address || ''}
                      onChange={handleEditChange}
                      margin="normal"
                  />
                  <TextField
                      fullWidth
                      label="Vehical Number"
                      name="vehicle Number"
                      value={editedDriver.vehiclenumber || ''}
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