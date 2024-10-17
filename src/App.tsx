import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import Register from './components/Register';
import Login from './components/Login';
import Map from './components/Map';
import Messages from './components/Messages';
import DriverDashboard from './components/DriverDashboard';
import HomePage from './pages/HomePage'; // Importa el componente HomePage
import UserDashboard from './components/UserDashboard'; // Importa el componente UserDashboard

interface Message {
  id: string;
  message: string;
}

interface User {
  id: string;
  userType: 'user' | 'driver';
  // Agrega otras propiedades del usuario si es necesario
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleRegister = () => {
    // Implementar lógica de registro
  };

  const handleLogin = (data: { user: User; email: string; password: string }) => {
    console.log('Login successful:', data);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const handleSendMessage = async (message: string) => {
    console.log('Sending message:', message);
    setMessages([...messages, { id: Date.now().toString(), message }]);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col" style={{ backgroundImage: `url(/assets/background.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/home" element={<HomePage />} /> {/* Añade la ruta para el componente HomePage */}
              <Route path="/register" element={<Register handleRegister={handleRegister} />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/map" element={<Map />} />
              <Route path="/messages" element={
                <Messages
                  messages={messages}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  handleSendMessage={handleSendMessage}
                />
              } />
              {user && user.userType === 'driver' && (
                <Route path="/driver-dashboard" element={<DriverDashboard userId={user.id} />} />
              )}
              {user && user.userType === 'user' && (
                <Route path="/user-dashboard" element={<UserDashboard userId={user.id} />} />
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;