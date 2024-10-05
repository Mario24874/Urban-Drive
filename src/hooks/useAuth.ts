import { useState, ChangeEvent } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthValues {
  displayName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  userType: 'user' | 'driver';
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
      const userCredential = await createUserWithEmailAndPassword(auth, authValues.email, authValues.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        displayName: authValues.displayName,
        email: authValues.email,
        phone: authValues.phone,
        userType: authValues.userType,
      });
      console.log('Usuario registrado con éxito');
    } catch (error) {
      setError({ general: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, authValues.email, authValues.password);
      return userCredential.user;
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