import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  handleLogin: (data: { user: any; email: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const { authValues, handleAuthChange, handleSubmit, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSubmit(e);
    if (result) {
      const { user, userType } = result;
      handleLogin({ user, email: authValues.email, password: authValues.password });
      alert('Login successful!');

      // Redirige a la página principal correspondiente
      navigate(userType === 'user' ? '/user-dashboard' : '/driver-dashboard');
    }
  };

  return (
    <div className="w-80 rounded-2xl bg-slate-900 bg-opacity-70 p-8">
      <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Mostrar errores generales */}
        {error && <p className="text-red-500">{error.general}</p>}

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

        {/* Botón de inicio de sesión */}
        <button
          className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 active:scale-95"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;