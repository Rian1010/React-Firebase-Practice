import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import * as firebase from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //   Create User
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   User Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   User Logout
  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return firebase.auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  //   Unsubscribe
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //   Context
  const value = {
    currentUser,
    login,
    logout,
    signup,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
