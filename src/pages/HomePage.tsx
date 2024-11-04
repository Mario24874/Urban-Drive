import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare } from 'lucide-react';
import SearchDriver from '../components/SearchDriver';

const HomePage: React.FC = () => {
  const [driver, setDriver] = useState<any | null>(null);

  const handleDriverFound = (driver: any) => {
    setDriver(driver);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-slate-900 bg-opacity-70 p-8 rounded-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-6">Welcome to UrbanDrive</h1>
        <p className="text-xl text-center text-gray-300 mb-8">Locate drivers in real time and communicate with them easily.</p>
        <div className="space-y-4">
          <Link to="/register" className="block w-full bg-gray-700 text-white px-6 py-3 rounded-lg text-center hover:bg-gray-800 transition duration-300">Register</Link>
          <Link to="/login" className="block w-full bg-gray-700 text-white px-6 py-3 rounded-lg text-center hover:bg-gray-800 transition duration-300">Login</Link>
        </div>
        <div className="mt-12 flex flex-col space-y-8">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-white mb-2" />
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">Real-time localization</h2>
            <p className="text-gray-300">Find nearby drivers on the map</p>
          </div>
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto text-white mb-2" />
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">Integrated messaging</h2>
            <p className="text-gray-300">Communicate directly with drivers</p>
          </div>
        </div>
        <div className="mt-8">
          <SearchDriver onDriverFound={handleDriverFound} />
          {driver && (
            <div className="mt-4 p-4 bg-slate-900 bg-opacity-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Driver Found:</h3>
              <p className="text-gray-300">Name: {driver.displayName}</p>
              <p className="text-gray-300">Phone: {driver.phoneNumber}</p>
              {/* Add more driver details here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;