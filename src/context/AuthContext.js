import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || '');
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || '');

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId(''); // Clear userId on logout
    localStorage.removeItem("userId"); // Remove userId from localStorage on logout
  };
  
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("userId", userId); // Update localStorage when userId changes
  }, [userId]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, userId, setUserId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
