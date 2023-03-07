import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = React.createContext(null);


export const ContextProvider = props => {
  const [login, setLogin] = useState(false);

  const logOut = () => {
   setLogin(false);
   localStorage.removeItem('token_rc');
  }

  const saveTokenInLocalStorage = (data) => {
    localStorage.setItem('token_rc',JSON.stringify(data))
  }


  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        setLogin,
        saveTokenInLocalStorage
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};