import CIcon from "@coreui/icons-react";
import { cilNotes, cilUser } from "@coreui/icons";
import { Link, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { GETPROFILEIMAGE } from "../Util/ApiUrl";

const DashBoard = () => {
  const { getValueFromLocalStorage } = useLocalStorage();
  const id = getValueFromLocalStorage("token_rc").id;

  return (
    <>
      <div className="sideBar">
        <div className="profile_wrapper">
          <div className="profile_inner_wrapper">
            <img
              src={GETPROFILEIMAGE + id}
              alt="prfile"
              className="profile_img"
            />
          </div>
        </div>
        <ul>
          <li>
            <CIcon icon={cilNotes} size="lg" className="icon" />
            <Link to="" className="link">
              <span className="link-item">Todo</span>
            </Link>
          </li>
          <li>
            <Link to={"profile/" + id} className="link">
              <CIcon icon={cilUser} size="lg" className="icon" />
              <span className="link-item">User</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};
export default DashBoard;
