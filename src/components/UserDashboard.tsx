import React, { Suspense } from 'react';

// Importación dinámica de UserProfile
const UserProfile = React.lazy(() => import('./UserProfile'));

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userId }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <Suspense fallback={<div>Loading User Profile...</div>}>
        <UserProfile userId={userId} userType="user" isVisible={true} />
      </Suspense>
      {/* Add more user-specific components here */}
    </div>
  );
};

export default UserDashboard;