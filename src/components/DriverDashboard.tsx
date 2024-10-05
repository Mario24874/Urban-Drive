import React from 'react';
import DriverLocation from './DriverLocation';

interface DriverDashboardProps {
  userId: string;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ userId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>
      <DriverLocation userId={userId} />
      {/* Add more driver-specific components here */}
    </div>
  );
};

export default DriverDashboard;