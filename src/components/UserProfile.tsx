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
    <div className="p-4 bg-slate-900 bg-opacity-50 rounded-lg shadow-lg">
      <label className="flex items-center space-x-2">
        <span className="text-gray-300">Visible</span>
        <input
          type="checkbox"
          checked={visibility}
          onChange={handleVisibilityChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </label>
    </div>
  );
};

export default UserProfile;