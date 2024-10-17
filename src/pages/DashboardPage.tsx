import React from 'react';
import { useAuth } from '../hooks/useAuth';
import UserDashboard from '../components/UserDashboard';
import DriverDashboard from '../components/DriverDashboard';

const DashboardPage: React.FC = () => {
  const { authValues } = useAuth();

  // Asegúrate de que authValues tenga userId
  const userId = authValues.userId || ''; // Puedes establecer un valor predeterminado si es necesario

  return (
    <div>
      {authValues.userType === 'user' ? (
        <UserDashboard userId={userId} />
      ) : (
        <DriverDashboard userId={userId} />
      )}
    </div>
  );
};

export default DashboardPage;