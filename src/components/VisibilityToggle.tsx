import React, { useState } from 'react';

interface VisibilityToggleProps {
  isVisible: boolean;
  onChange: (isVisible: boolean) => void;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ isVisible, onChange }) => {
  const [visibility, setVisibility] = useState(isVisible);

  const handleVisibilityChange = () => {
    const newVisibility = !visibility;
    setVisibility(newVisibility);
    onChange(newVisibility);
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

export default VisibilityToggle;