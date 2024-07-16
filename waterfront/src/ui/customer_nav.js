import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

export default function Customer_nav() {
  return (
    <nav  style={{
      background: 'linear-gradient(90deg, #5AB2FF, #0073E6)',
      padding: '10px 20px',
      height: '60px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>Customer Portal</div>
      <ul style={{
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center'
      }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '18px',
            transition: 'color 0.3s',
            fontWeight: '500'
          }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
             onMouseOut={(e) => e.target.style.color = '#fff'}
          >HISTORY</Link>
        </li>

        <li>
          <Link to="" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.3s'
          }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
             onMouseOut={(e) => e.target.style.color = '#fff'}
          >
            <AccountCircleSharpIcon style={{ fontSize: '40px' }} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
