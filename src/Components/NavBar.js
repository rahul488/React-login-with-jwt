import { CButton, CContainer, CNavbar, CNavbarText } from "@coreui/react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Conext/AuthContext";

const NavBar = () => {

    const { login, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = () => {
        if(login){
            logOut();
        } 
        navigate("/")
    }
    

  return (
    <CNavbar colorScheme="dark" className="bg-dark  sticky-top">
      <CContainer fluid>
        <CNavbarText>PIO-APP</CNavbarText>
        <CButton type="submit" color="light" variant="outline" onClick={handleClick}>
          {!login ? 'Login' : 'Logout'}
        </CButton>
      </CContainer>
    </CNavbar>
  );
};
export default NavBar;
