import { useAuth, useUser } from '@clerk/clerk-react';
import './dashboardPage.scss';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import AiPreview from '../../aipreview/AiPreview';

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
      <h1>Hoşgeldin {user?.fullName}</h1>
      <div className="analysis">
        <div className="natalchart">
          <img src="./natal.png" alt="" />
        </div>
        <div className="aimessage">
          <div className="aitext">
            <img src="./ai.png" alt="" />
            <h3>
              Umarım güzel bir gün geçiriyorsundur
              :) İşte senin için bazı önerilerim:
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
        </div>
      </div>
      <div className="userfeedback"></div>
    </div>
  );
};

export default DashboardPage;
