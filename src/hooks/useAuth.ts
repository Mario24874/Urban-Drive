import { useState, ChangeEvent } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthValues {
  displayName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  userType: 'user' | 'driver';
  isVisible: boolean; // Nuevo campo para la visibilidad
  userId: string; // Añade userId a AuthValues
}

interface AuthError {
  general?: string;
  displayName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const useAuth = () => {
  const [authValues, setAuthValues] = useState<AuthValues>({
    displayName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    userType: 'user',
    isVisible: true, // Valor predeterminado para la visibilidad
    userId: '', // Valor predeterminado para userId
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const handleAuthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAuthValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      const { email, password, displayName, phone, userType, isVisible } = authValues;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, userType === 'user' ? 'users' : 'drivers', user.uid), {
        displayName,
        email,
        phone,
        userType,
        isVisible, // Guardar la visibilidad en Firestore
      });
      console.log('Usuario registrado con éxito');
      return user;
    } catch (error) {
      setError({ general: (error as Error).message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { email, password } = authValues;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener datos adicionales de Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const driverDoc = await getDoc(doc(db, 'drivers', user.uid));

      const userData = userDoc.exists() ? userDoc.data() : null;
      const driverData = driverDoc.exists() ? driverDoc.data() : null;

      // Determinar userType
      const userType = userData ? 'user' : 'driver';

      // Actualizar authValues con userId y userType
      setAuthValues(prev => ({
        ...prev,
        userId: user.uid,
        userType,
      }));

      // Devolver un objeto que incluya userType
      return { user, userData, driverData, userType };
    } catch (error) {
      setError({ general: (error as Error).message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    authValues,
    handleAuthChange,
    handleRegister,
    handleSubmit,
    loading,
    error,
  };
};