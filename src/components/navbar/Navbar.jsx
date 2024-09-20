import React, { useState, useEffect } from 'react';
import './navbar.scss';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/clerk-react';
import { useMyContext } from '../../context/Context';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { eSelected, setESelected } = useMyContext();
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
              <span>{eSelected ? 'Home' : 'Anasayfa'}</span>
            </a>
          </div>
          <div className="dashboard">
            <img src="/dashboard.png" alt="Dashboard" />
            <a href="/dashboard" onClick={toggleMenu}>
              <span>{eSelected ? 'Dashboard' : 'Kontrol Paneli'}</span>
            </a>
          </div>
          <div className="chat">
            <img src="/chat.png" alt="Chat" />
            <a href="/chat" onClick={toggleMenu}>
              <span>{eSelected ? 'Chat' : 'Mesaj'}</span>
            </a>
          </div>
          <div className="analysis">
            <img src="/analysis.png" alt="Analysis" />
            <a href="/analysis" onClick={toggleMenu}>
              <span>{eSelected ? 'Analysis' : 'Analiz'}</span>
            </a>
          </div>
        </div>
        <div className="auth">
          <div className="languages">
            <img
              src="/turkish.png"
              alt=""
              className={eSelected ? '' : 'selected'}
              onClick={() => setESelected(false)}
            />
            <img
              src="/english.png"
              alt=""
              className={eSelected ? 'selected' : ''}
              onClick={() => setESelected(true)}
            />
          </div>
          <div className="authbutton">
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
