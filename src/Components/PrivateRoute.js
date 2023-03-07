import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Conext/AuthContext";


const PrivateRoute = ({children}) => {

    const { login } = useContext(AuthContext);

    return login ? children : <Navigate to="/" />

}
export default PrivateRoute;