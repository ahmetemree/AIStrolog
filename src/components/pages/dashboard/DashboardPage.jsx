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

export const data = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 }
];


const DashboardPage = () => {

  
  
  const { eSelected, setESelected } = useMyContext();
  const { redirect, setRedirect } = useRedirectContext();
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
  useEffect(() => {
    if (isLoaded && userId) {
      getChats();
    }
  }, [isLoaded, userId]);
  const navigate = useNavigate();
  
  const [singleChat, setSingleChat] = useState([]);
  const [singleChatId, setSingleChatId] = useState("");
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
      setRedirect("dashboard")
    }
  }, [isLoaded, userId, navigate]);


  const getChats = async () => {
    // debugger
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getchats`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      
    });
    const data = await response.json();
    // console.log("chats:",data);
    
    // console.log("chats:",data[data.length - 1].chats[0]._id);
    setSingleChatId(data[data.length - 1].chats[0]._id);
    getSingleChat(data[data.length - 1].chats[0]._id);
  }

  const getSingleChat = async (chatId) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getchat/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ chatId })
    });
    const data = await response.json();
    // console.log(data);
   setSingleChat(data);
  }

  useEffect(() => {
    getChats();
  }, [isLoaded]);

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
            className='welcome'
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
            {eSelected ? "Your zodiac sign: Pisces" : "Burcunuz: Balık"}
          </motion.h1>
          <div className="aitext">
            <img src="./ai.png" alt="" />
            <h3>
              { eSelected ? "I hope you're having a great day. Here are some suggestions for you:" : "Umarım güzel bir gün geçiriyorsundur. İşte senin için bazı önerilerim:"}
            </h3>
          </div>
          <span >{eSelected ? "Go to your last conversation with the AI." :"Yapay zeka ile son sohbetine git:"}</span>
          <AiPreview chats={singleChat} />
          <span>{eSelected ? "Or" : "Ya da"}</span>
          <div className="buttonwrapper" >
            <Link to={'/chat'}>
            
            <button>
              <img src="./newmessage.png" alt="" />
              {eSelected ? "Create New Message" : "Yeni Mesaj Oluştur"}
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
