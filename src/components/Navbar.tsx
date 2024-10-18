import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, LogIn, UserPlus, LogOut, Home, User, LayoutDashboard } from 'lucide-react';
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
        <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
          {isAuthenticated ? (
            <>
              <Link to="/" className="hover:text-blue-200 flex items-center">
                <Home className="inline-block mr-1" />
                <span className="hidden md:inline">Home</span>
              </Link>
              <Link to="/map" className="hover:text-blue-200 flex items-center">
                <MapPin className="inline-block mr-1" />
                <span className="hidden md:inline">Map</span>
              </Link>
              <Link to="/messages" className="hover:text-blue-200 flex items-center">
                <MessageSquare className="inline-block mr-1" />
                <span className="hidden md:inline">Messages</span>
              </Link>
              <Link to="/dashboard" className="hover:text-blue-200 flex items-center">
                <LayoutDashboard className="inline-block mr-1" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>
              <Link to="/profile" className="hover:text-blue-200 flex items-center">
                <User className="inline-block mr-1" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <button onClick={handleLogout} className="hover:text-blue-200 flex items-center">
                <LogOut className="inline-block mr-1" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 flex items-center">
                <LogIn className="inline-block mr-1" />
                <span className="hidden md:inline">Login</span>
              </Link>
              <Link to="/register" className="hover:text-blue-200 flex items-center">
                <UserPlus className="inline-block mr-1" />
                <span className="hidden md:inline">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;