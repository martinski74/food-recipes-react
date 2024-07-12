import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: localStorage.getItem('token'),
  user: localStorage.getItem('email'),
});

export default AuthContext;
