import React, { useState, useEffect } from 'react';
import './navbar.scss';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/clerk-react';
import { useMyContext } from '../../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { TbUser, TbZodiacCancer } from 'react-icons/tb';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { eSelected, setESelected } = useMyContext();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          <Link to={'/'} type="a">
            <img src="/logo.png" alt="Logo" />
            <div className="text">
              <span>AIStrolog</span>
            </div>
          </Link>
        </div>
        <div className={`options ${isMenuOpen ? 'active' : ''}`}>
          <Link to={'/'} type="a" className="home" onClick={closeMenu}>
            <img src="/home.png" alt="Home" />
            <span>{eSelected ? 'Home' : 'Anasayfa'}</span>
          </Link>

          <Link
            to={'/dashboard'}
            type="a"
            className="dashboard"
            onClick={closeMenu}
          >
            <img src="/dashboard.png" alt="Dashboard" />

            <span>{eSelected ? 'Dashboard' : 'Kontrol Paneli'}</span>
          </Link>

          <Link to={'/chat'} type="a" className="chat" onClick={closeMenu}>
            <img src="/chat.png" alt="Chat" />
            <span>{eSelected ? 'Chat' : 'Mesaj'}</span>
          </Link>

          <Link
            to={'/analysis'}
            type="a"
            className="analysis"
            onClick={closeMenu}
          >
            <img src="/analysis.png" alt="Analysis" />
            <span>{eSelected ? 'Analysis' : 'Analiz'}</span>
          </Link>

          <Link
            to={'/subscriptions'}
            type="a"
            className="subscription"
            onClick={closeMenu}
          >
            <img src="/subscription.png" alt="Subscriptions" />
            <span>{eSelected ? 'Subscriptions' : 'Abonelikler'}</span>
          </Link>
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
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Subscriptions"
                      labelIcon={<TbZodiacCancer />}
                      onClick={() => navigate('/subscriptions')}
                    />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="User Informations"
                      labelIcon={<TbUser />}
                      onClick={() => navigate('/user-informations')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
