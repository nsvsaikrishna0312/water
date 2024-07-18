import React, {useEffect, useState} from 'react'
import NavBarDesign from './navbar';
import AddIcon from '@mui/icons-material/Add';
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

export default function Item() {
    const [items, setItems] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/item')
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => {
                console.error('Error fetching all data: ', error);
                setItems([]);
            });
    }, []);

    const handleOpenDeleteDialog = (item) => {
        setCurrentItem(item);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentItem(null);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/item/${currentItem._id}`)
            .then((res) => {
                if (res.status === 200) {
                    setItems(items.filter(item => item._id !== currentItem._id));
                    handleCloseDeleteDialog();
                } else {
                    console.error('Failed to delete Item:', res.data);
                }
            })
            .catch((error) => {
                console.error('Error deleting item: ', error);
            });
    };

    const handleOpenEditDialog = (item) => {
        setCurrentItem(item);
        setEditedItem(item);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setCurrentItem(null);
        setEditedItem({});
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleEditSubmit = () => {
        axios.put(`http://localhost:5000/api/item/${currentItem._id}`, editedItem)
            .then((res) => {
                if (res.status === 200) {
                    setItems(items.map(item =>
                        item._id === currentItem._id ? res.data : item));
                    handleCloseEditDialog();
                } else {
                    console.error('Failed to update item:', res.data);
                }
            })
            .catch((error) => {
                console.error('Error updating item: ', error);
            });
    };

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px',
    };

    const cardStyle = {
        backgroundColor: '#0F67B1',
        height: '400px',
        width: '280px',
        padding: '19px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
         textAlign: 'center'
    };

    const imageStyle = {
        width: '100%',
        height: '250px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
    };

    const titleStyle = {
        fontSize: '20px',
        marginBottom: '-5px',
        fontWeight: 'bold',
        color: '#fff',
        textShadow: '2px 1px 2px rgba(0, 0, 0, 0.2)',
    };

    const textStyle = {
         fontSize: '18px',
        color: '#ffffff',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Adding subtle shadow
        marginBottom: '-4%'
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
                        Item
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={{ width: { xs: 'auto', md: 'auto' } }}>
                    <Link to="/admin/additem" style={{ textDecoration: 'none' }}>
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
                            placeholder="Search Items"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Form>
            </div>

            <div style={containerStyle}>
                {items
                    .filter((item) => {
                        const lowerSearch = search.toLowerCase();
                        return (
                            lowerSearch === '' ||
                            item.itemname.toLowerCase().includes(lowerSearch) ||
                            item.price.toString().includes(lowerSearch)
                        );
                    })
                    .map((item) => (
                        <div key={item._id} style={cardStyle}>
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '5%'}}>
                                <DeleteIcon
                                    style={{cursor: 'pointer', marginRight: '12px'}}
                                    onClick={() => handleOpenDeleteDialog(item)}
                                />
                                <EditIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => handleOpenEditDialog(item)}
                                />
                            </div>
                            <img src={item.itemimageurl} alt={item.itemname} style={imageStyle}/>
                            <h5 style={titleStyle}>{item.itemname}</h5>
                            <p style={textStyle}>Price: {item.price}</p>
                        </div>
                    ))}
            </div>

            {/* Delete Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Item</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this Item?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Item Name"
                        name="itemname"
                        value={editedItem.itemname || ''}
                        onChange={handleEditChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Image URL"
                        name="itemimageurl"
                        value={editedItem.itemimageurl || ''}
                        onChange={handleEditChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={editedItem.price || ''}
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
