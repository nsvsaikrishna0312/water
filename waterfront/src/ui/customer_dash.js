import React, {useEffect, useState} from 'react'
import Customer_nav from "./customer_nav";
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
    const [currentItem, setCurrentItem] = useState(null);
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
        borderRadius: '8px 8px 8px 8px',
        marginTop:'15%'
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
        marginBottom: '-2%'
    };

    return (
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <Customer_nav/>



            <div style={{borderRadius: '5px', width: '95%', display: 'flex', justifyContent: 'center', margin: 'auto',marginTop:'4%',marginBottom:'2%'}}>
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

                            <img src={item.itemimageurl} alt={item.itemname} style={imageStyle}/>
                            <h5 style={titleStyle}>{item.itemname}</h5>
                            <p style={textStyle}>Price: {item.price}</p>
                        </div>
                    ))}
            </div>




        </div>
    );
}
