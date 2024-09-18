import React, { useState, useEffect } from 'react';
import './navbar.scss';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 885) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        className={`overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      ></div>
      <nav className="navbar">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <img src="/hamburger.png" alt="" />
        </div>
        <div className="logo">
          <a href="/">
            <img src="/logo.png" alt="Logo" />
            <div className="text">
              <span>AIStrolog</span>
            </div>
          </a>
        </div>
        <div className={`options ${isMenuOpen ? 'active' : ''}`}>
          <div className="home">
            <img src="/home.png" alt="Home" />
            <a href="/" onClick={toggleMenu}>
              <span>Home</span>
            </a>
          </div>
          <div className="dashboard">
            <img src="/dashboard.png" alt="Dashboard" />
            <a href="/dashboard" onClick={toggleMenu}>
              <span>Dashboard</span>
            </a>
          </div>
          <div className="chat">
            <img src="/chat.png" alt="Chat" />
            <a href="/chat" onClick={toggleMenu}>
              <span>Chat</span>
            </a>
          </div>
          <div className="analysis">
            <img src="/analysis.png" alt="Analysis" />
            <a href="/analysis" onClick={toggleMenu}>
              <span>Analysis</span>
            </a>
          </div>
        </div>
        <div className="auth">
          <a href="/login">
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </a>
          <a href="/signup">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
