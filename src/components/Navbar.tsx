import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, LogIn, UserPlus, LogOut } from 'lucide-react';
import UrbanDriveLogo from '/assets/UrbanDrive.png'; // Asegúrate de que la ruta sea correcta

interface NavbarProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={UrbanDriveLogo} alt="UrbanDrive Logo" className="h-9 w-auto mr-2" />
          <Link to="/" className="text-2xl font-bold">UrbanDrive</Link>
        </div>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/map" className="hover:text-blue-200"><MapPin className="inline-block mr-1" />Map</Link>
              <Link to="/messages" className="hover:text-blue-200"><MessageSquare className="inline-block mr-1" />Messages</Link>
              <button onClick={handleLogout} className="hover:text-blue-200"><LogOut className="inline-block mr-1" />Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200"><LogIn className="inline-block mr-1" />Login</Link>
              <Link to="/register" className="hover:text-blue-200"><UserPlus className="inline-block mr-1" />Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;