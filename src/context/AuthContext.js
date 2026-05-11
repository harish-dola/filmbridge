'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('fb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitialized(true);
  }, []);

  const login = (userData) => {
    const userObj = userData || { 
      name: 'Producer', 
      email: 'creator@studio.com', 
      isAdmin: true,
      savedArticles: [] 
    };
    if (!userObj.savedArticles) userObj.savedArticles = [];
    setUser(userObj);
    localStorage.setItem('fb_user', JSON.stringify(userObj));
  };

  const toggleSaveArticle = (articleId) => {
    if (!user) return;
    const isSaved = user.savedArticles?.includes(articleId);
    const newSaved = isSaved 
      ? user.savedArticles.filter(id => id !== articleId)
      : [...(user.savedArticles || []), articleId];
    
    const updatedUser = { ...user, savedArticles: newSaved };
    setUser(updatedUser);
    localStorage.setItem('fb_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fb_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialized, toggleSaveArticle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
