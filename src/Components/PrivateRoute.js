import { Navigate } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const { getValueFromLocalStorage } = useLocalStorage();
  const user = getValueFromLocalStorage("token_rc");

  return user ? children : <Navigate to="/" />;
};
export default PrivateRoute;
