import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface DriverProfileProps {
  driverId: string;
  isVisible: boolean;
}

const DriverProfile: React.FC<DriverProfileProps> = ({ driverId, isVisible }) => {
  const [visibility, setVisibility] = useState(isVisible);

  const handleVisibilityChange = async () => {
    const visibilityRef = doc(db, 'drivers', driverId);
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

export default DriverProfile;