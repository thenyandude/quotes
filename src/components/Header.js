import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
    const { isLoggedIn, username, logout } = useAuth();

    return (
        <header>
            <div className="header-logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src="cat-test.png" alt="Logo" style={{ height: '50px' }} />
                </Link>
            </div>  
            <div className="header-title">
                {isLoggedIn ? (
                    <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Quotes - {username}
                    </Link>
                ) : (
                    'Quotes'
                )}
            </div>
            <div className="header-auth">
                {isLoggedIn ? (
                    <>
                        <Link to="/top" className="auth-link">Top Quotes</Link>
                        <button onClick={logout} className="auth-link">Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="auth-link">Sign Up</Link>
                        <Link to="/login" className="auth-link">Log In</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
