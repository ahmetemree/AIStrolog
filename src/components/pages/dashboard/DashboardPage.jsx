import { useAuth } from '@clerk/clerk-react';
import './dashboardPage.scss';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';

const DashboardPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return <div className="loading">
    <Loader color="blue" />;
  </div>;

  return <div className="dashboardpage">DashboardPage</div>;
};

export default DashboardPage;
