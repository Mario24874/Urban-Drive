import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  handleRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ handleRegister }) => {
  const { authValues, handleAuthChange, handleRegister: registerUser, loading, error } = useAuth();
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await registerUser();
    if (user) {
      handleRegister();
      navigate('/login'); // Redirige a la página de inicio de sesión
    }
  };

  const toggleTerms = () => setShowTerms(!showTerms);

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-70">
      <div className="flex flex-col gap-2 p-8">
        <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
        <form onSubmit={handleSubmit}>
          {/* Mostrar errores generales */}
          {error && <p className="text-red-500">{error.general}</p>}

          {/* Campo para el nombre de usuario */}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Display Name"
            name="displayName"
            value={authValues.displayName}
            onChange={handleAuthChange}
          />
          {/* Mostrar errores específicos del nombre de usuario */}
          {error && error.displayName && <p className="text-red-500">{error.displayName}</p>}

          {/* Campo para el correo electrónico */}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Email"
            name="email"
            value={authValues.email}
            onChange={handleAuthChange}
          />
          {/* Mostrar errores específicos del correo electrónico */}
          {error && error.email && <p className="text-red-500">{error.email}</p>}

          {/* Campo para el número de teléfono */}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Phone"
            name="phone"
            value={authValues.phone}
            onChange={handleAuthChange}
          />

          {/* Campo para la contraseña */}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Password"
            type="password"
            name="password"
            value={authValues.password}
            onChange={handleAuthChange}
          />
          {/* Mostrar errores específicos de la contraseña */}
          {error && error.password && <p className="text-red-500">{error.password}</p>}

          {/* Campo para confirmar la contraseña */}
          <input
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white"
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={authValues.confirmPassword}
            onChange={handleAuthChange}
          />
          {/* Mostrar errores específicos de la confirmación de la contraseña */}
          {error && error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}

          {/* Checkbox para aceptar términos de uso */}
          <label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
            Accept terms of use
            <div className="relative inline-block">
              <input
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                type="checkbox"
                name="acceptTerms"
                checked={authValues.acceptTerms}
                onChange={handleAuthChange}
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
            </div>
          </label>

          {/* Enlace para mostrar los términos de uso */}
          <p className="text-sm text-gray-300 mt-2">
            By registering, you agree to our{' '}
            <button type="button" className="text-blue-500 underline" onClick={toggleTerms}>
              Terms of Use
            </button>
          </p>

          {/* Modal para mostrar los términos de uso */}
          {showTerms && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg max-w-md">
                <h2 className="text-xl font-bold mb-4">Terms of Use</h2>
                <p className="mb-4">
                  {authValues.userType === 'user' ? (
                    <>
                      <strong>UrbanDrive Terms of Use for Users</strong>
                      <br />
                      Welcome to UrbanDrive! These terms of use ("Terms") govern your use of our platform as a user. By registering and using UrbanDrive, you agree to comply with these Terms.
                      <br />
                      1. **Account Registration**:
                      <br />
                      - You must provide accurate and complete information during the registration process.
                      <br />
                      - You are responsible for maintaining the confidentiality of your account credentials.
                      <br />
                      2. **User Responsibilities**:
                      <br />
                      - You agree to use the platform only for its intended purposes.
                      <br />
                      - You must not engage in any activity that could harm the platform or other users.
                      <br />
                      3. **Communication**:
                      <br />
                      - You may communicate with drivers through the platform's messaging system.
                      <br />
                      - All communications must be respectful and appropriate.
                      <br />
                      4. **Privacy**:
                      <br />
                      - Your personal information will be handled in accordance with our Privacy Policy.
                      <br />
                      5. **Termination**:
                      <br />
                      - We reserve the right to terminate your account if you violate these Terms.
                      <br />
                      By accepting these Terms, you acknowledge that you have read, understood, and agree to be bound by them.
                    </>
                  ) : (
                    <>
                      <strong>UrbanDrive Terms of Use for Drivers</strong>
                      <br />
                      Welcome to UrbanDrive! These terms of use ("Terms") govern your use of our platform as a driver. By registering and using UrbanDrive, you agree to comply with these Terms.
                      <br />
                      1. **Account Registration**:
                      <br />
                      - You must provide accurate and complete information during the registration process.
                      <br />
                      - You are responsible for maintaining the confidentiality of your account credentials.
                      <br />
                      2. **Driver Responsibilities**:
                      <br />
                      - You agree to use the platform only for its intended purposes.
                      <br />
                      - You must not engage in any activity that could harm the platform or other users.
                      <br />
                      3. **Communication**:
                      <br />
                      - You may communicate with users through the platform's messaging system.
                      <br />
                      - All communications must be respectful and appropriate.
                      <br />
                      4. **Location Services**:
                      <br />
                      - You agree to enable location services to provide real-time updates to users.
                      <br />
                      5. **Privacy**:
                      <br />
                      - Your personal information will be handled in accordance with our Privacy Policy.
                      <br />
                      6. **Termination**:
                      <br />
                      - We reserve the right to terminate your account if you violate these Terms.
                      <br />
                      By accepting these Terms, you acknowledge that you have read, understood, and agree to be bound by them.
                    </>
                  )}
                </p>
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-md"
                  onClick={toggleTerms}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Radio buttons para seleccionar el tipo de usuario */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="userType"
                value="user"
                checked={authValues.userType === 'user'}
                onChange={handleAuthChange}
              />
              <span className="ml-2 text-gray-300">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="userType"
                value="driver"
                checked={authValues.userType === 'driver'}
                onChange={handleAuthChange}
              />
              <span className="ml-2 text-gray-300">Driver</span>
            </label>
          </div>

          {/* Botón de registro */}
          <button
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;