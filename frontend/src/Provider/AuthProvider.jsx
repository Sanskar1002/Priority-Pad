import React, { useState } from 'react'
import AuthContext from '../context/AuthContext'

const AuthProvider = ({children}) => {
    // const [isLoggedIn , setIsLoggedIn] = useState(false);
    // const login = ()=> setIsLoggedIn(true);
    // const logout = ()=> setIsLoggedIn(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
      Boolean(localStorage.getItem("isLoggedIn")) // Persist login state
    );
  
    const login = () => {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    };
  
  return (
    <AuthContext.Provider value={{isLoggedIn,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
