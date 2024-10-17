import React from 'react';
import DriverLocation from './DriverLocation';

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <DriverLocation userId={userId} />
      {/* Add more user-specific components here */}
    </div>
  );
};

export default UserDashboard;