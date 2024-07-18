import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMenu(false); // Close the menu when switching to desktop view
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav style={{
      background: 'linear-gradient(90deg, #5AB2FF, #0073E6)',
      padding: '10px 20px',
      height: 'auto',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative' // Ensure the nav element is relatively positioned
    }}>
      <div style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>Admin Portal</div>

      {/* Hamburger Menu Icon for Mobile */}
      {isMobile && (
        <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      )}

      {/* Dropdown Menu for Mobile */}
      {isMobile && showMenu && (
        <ul ref={menuRef} style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          position: 'absolute',
          top: '100%', // Position below the toggle menu
          left: '50%',
          backgroundColor: '#3FA2F6',
          minWidth: '50%',
          textAlign: 'center',
          zIndex: 1000 // Ensure dropdown is above other content
        }}>
          <li style={{ padding: '10px 0' }}>
            <Link to="/admin/item" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s',
              fontWeight: '500'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >ITEM</Link>
          </li>
          <li style={{ padding: '10px 0' }}>
            <Link to="/" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s',
              fontWeight: '500'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >CUSTOMER</Link>
          </li>
          <li style={{ padding: '10px 0' }}>
            <Link to="/driver" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s',
              fontWeight: '500'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >DRIVER</Link>
          </li>
          <li style={{ padding: '10px 0' }}>
            <Link to="/profile" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.3s'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >
              <AccountCircleSharpIcon style={{ fontSize: '40px' }} />
            </Link>
          </li>
        </ul>
      )}

      {/* Navigation Links for Desktop */}
      {!isMobile && (
        <ul style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          alignItems: 'center'
        }}>
          <li style={{ marginRight: '20px' }}>
            <Link to="/admin/item" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s',
              fontWeight: '500'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >ITEM</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s',
              fontWeight: '500'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >CUSTOMER</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/driver" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s',
              fontWeight: '500'
            }} onMouseOver={(e) => e.target.style.color = '#FFD700'}
              onMouseOut={(e) => e.target.style.color = '#fff'}
            >DRIVER</Link>
          </li>
          <li>
            <Link to="/profile" style={{
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
      )}
    </nav>
  );
};

export default NavBar;
