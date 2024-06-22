import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/web-extension';
import { auth, db } from '../firebase';
import { saveUserData } from '../services/user-service';
import { doc, getDoc } from 'firebase/firestore';

export const LoginForm: React.FC = () => {
  console.log('login-form.tsx');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    console.log('handleLogin');
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const initializeUser = async (authResult: any) => {
    console.log('initializeUser');
    const newUser = {
      userId: authResult.user.uid,
      name: authResult.user.displayName || 'Unknown',
      email: authResult.user.email || 'No email provided',
      friends: [],
      history: [],
      activeTab: { url: 'offline', timestamp: new Date(), title: 'Offline' },
    };
    saveUserData(authResult.user.uid, newUser);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    console.log('handleCreateAccount');
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", result.user.uid);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        console.log("User exists in database.");
      } else {
        console.log("User does not exist in database.");
        await initializeUser(result);
      }
      // TODO: add loading or timeout here
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-2 p-2 border"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex">
        <button type="submit" className="bg-customGreen text-white p-2 rounded mr-2">
          Log In
        </button>
        <button onClick={handleCreateAccount} className="bg-customGreen text-white p-2 rounded">
          Create Account
        </button>
      </div>
    </form>
  );
};