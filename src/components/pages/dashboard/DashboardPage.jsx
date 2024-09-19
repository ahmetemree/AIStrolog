import { useAuth, useUser } from '@clerk/clerk-react';
import './dashboardPage.scss';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import AiPreview from '../../aipreview/AiPreview';
import { motion } from 'framer-motion';

export const data = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 }
];

const DashboardPage = () => {
  const { user } = useUser();
  console.log(user);
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded)
    return (
      <div className="loading">
        <Loader color="blue" />;
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
      >
        Hoşgeldin <br/>{user?.fullName}
      </motion.h1>
          <motion.img
            src="./natal.png"
            alt=""
            initial={{ opacity: 0, x: -50 ,scale:0.85}}
            whileInView={{ opacity: 0.5, x: 0 ,scale:1}}
            transition={{ duration: 1.0 }}
            
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
        Burcunuz: Balık
      </motion.h1>
          <div className="aitext">
            <img src="./ai.png" alt="" />
            <h3>
              Umarım güzel bir gün geçiriyorsundur :) İşte senin için bazı
              önerilerim:
            </h3>
          </div>
          <span>Yapay zeka ile son sohbetine git:</span>
          <AiPreview />
          <span>Ya da</span>
          <div className="buttonwrapper">
            <button>
              <img src="./newmessage.png" alt="" />
              Yeni Mesaj Oluştur
            </button>
          </div>
        </motion.div>
      </div>
      <div className="userfeedback"></div>
    </div>
  );
};

export default DashboardPage;
