import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; 
import UserProfile from '../components/UserProfile';
import DriverProfile from '../components/DriverProfile';

const ProfilePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'user' | 'driver' | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Obtener el ID del usuario actual (puedes obtenerlo de la autenticación)
    const currentUserId = 'someUserId'; // Reemplaza con la lógica para obtener el ID del usuario actual
    setUserId(currentUserId);

    // Obtener el tipo de usuario y la visibilidad desde Firestore
    const fetchUserData = async () => {
      if (currentUserId) {
        const userDoc = await getDoc(doc(db, 'users', currentUserId));
        if (userDoc.exists()) {
          setUserType('user');
          setIsVisible(userDoc.data().isVisible);
        } else {
          const driverDoc = await getDoc(doc(db, 'drivers', currentUserId));
          if (driverDoc.exists()) {
            setUserType('driver');
            setIsVisible(driverDoc.data().isVisible);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  if (!userId || !userType) {
    return <div>Loading...</div>;
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