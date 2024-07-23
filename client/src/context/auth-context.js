import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: localStorage.getItem('token'),
  user: localStorage.getItem('username'),
});

export default AuthContext;
