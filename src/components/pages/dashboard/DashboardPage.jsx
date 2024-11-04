import { useAuth, useUser } from '@clerk/clerk-react';
import './dashboardPage.scss';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import AiPreview from '../../aipreview/AiPreview';
import { motion } from 'framer-motion';
import { useMyContext } from '../../../context/Context';
import { useRedirectContext } from '../../../context/RedirectContext';

const DashboardPage = () => {
  const { eSelected, setESelected } = useMyContext();
  const { redirect, setRedirect } = useRedirectContext();
  const { user } = useUser();
  const { userId, isLoaded, getToken, isSignedIn } = useAuth();
  const [token, setUserToken] = useState('');
  const [birthday, setBirthday] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        try {
          const newToken = await getToken();
          setUserToken(newToken);
        } catch (error) {
          console.error('Token alınamadı:', error);
        }
      }
    };

    fetchToken();
  }, [isSignedIn, getToken]);

  useEffect(() => {
    if (isLoaded && userId && token) {
      getChats();
    }
  }, [isLoaded, userId, token]);

  const navigate = useNavigate();

  const [singleChat, setSingleChat] = useState([]);
  const [singleChatId, setSingleChatId] = useState('');

  const refreshToken = async () => {
    if (isSignedIn) {
      try {
        const newToken = await getToken();
        setUserToken(newToken);
      } catch (error) {
        console.error('Token yenilenemedi:', error);
      }
    }
  };

  useEffect(() => {
    refreshToken();
    const intervalId = setInterval(refreshToken, 50 * 60 * 1000); // Her 50 dakikada bir yenile

    return () => clearInterval(intervalId);
  }, [isSignedIn, getToken]);

  useEffect(() => {
    getUserInformations(token);
  });

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
      setRedirect('dashboard');
    }
  }, [isLoaded, userId, navigate]);

  const getUserInformations = async token => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/getUserInfo`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setZodiacSign(data.zodiacSign);
    } catch (error) {
      console.log(error);
    }
  };

  const getChats = async () => {
    if (!token) {
      console.error('Token bulunamadı');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/getchats`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          credentials: 'include'
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length > 0 && data[data.length - 1].chats.length > 0) {
        setSingleChatId(data[data.length - 1].chats[0]._id);
        getSingleChat(data[data.length - 1].chats[0]._id);
      }
    } catch (error) {
      console.error('Sohbetler alınamadı:', error);
    }
  };

  const getSingleChat = async chatId => {
    if (!token) {
      console.error('Token bulunamadı');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/getchat/${chatId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({ chatId })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSingleChat(data);
    } catch (error) {
      console.error('Tek sohbet alınamadı:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getChats();
    }
  }, [token]);

  if (!isLoaded)
    return (
      <div className="loading">
        <Loader color="blue" />
      </div>
    );

  return (
    <div className="dashboardpage">
      <div className="intro">
        <motion.h1
          initial={{ opacity: 0, x: -250 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0 }}
        >
          {/* Hoşgeldin {user?.fullName} */}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -250 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0 }}
        >
          {/* Burcunuz: Balık */}
        </motion.h1>
      </div>
      <div className="analysis">
        <div className="natalchart">
          <motion.h1
            initial={{ opacity: 0, x: -250 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            className="welcome"
          >
            {eSelected ? (
              <>
                Welcome <br /> {user?.fullName}
              </>
            ) : (
              <>
                Hoşgeldin <br /> {user?.fullName}
              </>
            )}
          </motion.h1>
          <motion.img
            src="./natal.png"
            alt=""
            initial={{ opacity: 0, x: -50, scale: 0.85 }}
            whileInView={{ opacity: 0.5, x: 0, scale: 1 }}
            transition={{ duration: 1.0 }}
            animate={{
              rotate: [-20, 20]
            }}
          />
        </div>
        <motion.div
          className="aimessage"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0 }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -250 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
          >
            {eSelected
              ? `Your zodiac sign: ${zodiacSign}`
              : `Burcunuz: ${zodiacSign}`}
          </motion.h1>
          <div className="aitext">
            <img src="./ai.png" alt="" />
            <h3>
              {eSelected
                ? "I hope you're having a great day. Here are some suggestions for you:"
                : 'Umarım güzel bir gün geçiriyorsundur. İşte senin için bazı önerilerim:'}
            </h3>
          </div>
          <span>
            {eSelected
              ? 'Go to your last conversation with the AI.'
              : 'Yapay zeka ile son sohbetine git:'}
          </span>
          <AiPreview chats={singleChat} />
          <span>{eSelected ? 'Or' : 'Ya da'}</span>
          <div className="buttonwrapper">
            <Link to={'/chat'}>
              <button>
                <img src="./newmessage.png" alt="" />
                {eSelected ? 'Create New Message' : 'Yeni Mesaj Oluştur'}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="userfeedback"></div>
    </div>
  );
};

export default DashboardPage;
