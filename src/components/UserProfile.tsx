import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface UserProfileProps {
  userId: string;
  userType: 'user' | 'driver';
  isVisible: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, userType, isVisible }) => {
  const [visibility, setVisibility] = useState(isVisible);

  const handleVisibilityChange = async () => {
    const visibilityRef = doc(db, userType === 'user' ? 'users' : 'drivers', userId);
    await updateDoc(visibilityRef, { isVisible: !visibility });
    setVisibility(!visibility);
  };

  return (
    <div>
      <label>
        Visible
        <input
          type="checkbox"
          checked={visibility}
          onChange={handleVisibilityChange}
        />
      </label>
    </div>
  );
};

export default UserProfile;