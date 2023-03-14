import moment from "moment";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = React.createContext(null);

export const ContextProvider = (props) => {
  const [login, setLogin] = useState(false);
  const {
    getValueFromLocalStorage,
    setValueInLocalStorage,
    removeValueFromLocalStorage,
  } = useLocalStorage();

  useEffect(() => {
    const user = getValueFromLocalStorage("token_rc");
    if (user) {
      if (moment(user.tokenExpireDate).valueOf() < Date.now()) {
        logOut();
      } else {
        setLogin(true);
      }
    }
  }, []);

  const logOut = () => {
    setLogin(false);
    removeValueFromLocalStorage("token_rc");
  };

  const saveTokenInLocalStorage = (data) => {
    setValueInLocalStorage("token_rc", data);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logOut,
        setLogin,
        saveTokenInLocalStorage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
