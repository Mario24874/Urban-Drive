import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Importa la instancia de Firestore desde firebase.ts

interface SearchDriverProps {
  onDriverFound: (driver: any) => void;
}

const SearchDriver: React.FC<SearchDriverProps> = ({ onDriverFound }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const driversRef = collection(db, 'drivers');
      const q = query(driversRef, where('phone', '==', phoneNumber)); // Asegúrate de que el campo sea 'phone'
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const driver = querySnapshot.docs[0].data();
        onDriverFound(driver);
      } else {
        setError('Driver not found');
      }
    } catch (error) {
      console.error('Error searching driver:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-900 bg-opacity-50 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Search Driver</h2>
      <input
        type="text"
        className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
        placeholder="Enter driver's phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95 mt-4"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchDriver;