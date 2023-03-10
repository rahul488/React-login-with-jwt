import moment from "moment/moment";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Conext/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthGuard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const { getValueFromLocalStorage } = useLocalStorage();

  useEffect(() => {
    const user = getValueFromLocalStorage("token_rc");
    if (user) {
      if (moment(user.tokenExpireDate).valueOf() < Date.now()) {
        logOut();
        navigate("/");
      }
    }
  }, [location]);

  return <></>;
};
