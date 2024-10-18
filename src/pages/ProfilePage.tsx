import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; 
import UserProfile from '../components/UserProfile';
import DriverProfile from '../components/DriverProfile';

interface ProfilePageProps {
  userId: string;
  userType: 'user' | 'driver';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId, userType }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const userDoc = await getDoc(doc(db, userType === 'user' ? 'users' : 'drivers', userId));
          if (userDoc.exists()) {
            setIsVisible(userDoc.data().isVisible);
          } else {
            setError('User not found');
          }
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {userType === 'user' ? (
        <UserProfile userId={userId} userType={userType} isVisible={isVisible} />
      ) : (
        <DriverProfile driverId={userId} isVisible={isVisible} />
      )}
    </div>
  );
};

export default ProfilePage;