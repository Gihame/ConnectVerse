import Multiply from "../assets/Multiply.png";
import logo from "../assets/logo.png";
import layout from "../assets/layout-dashboard.png";
import member from "../assets/Member.png";
// import letter from "../assets/Letter.png";
// import outline from "../assets/Outline.png";
// import page from "../assets/Page.png";
import logouts from "../assets/Logout Rounded.png";
import ctn from "../assets/ctn.png";
import "../styles/Admin.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../state/auth/auth";

const Sidebar = ({
  state,
  setState,
}: {
  state: boolean;
  setState: (value: boolean) => void;
}) => {
  console.log(state);
  const dispatch = useDispatch();
  const handleClose = () => {
    setState(!state);
  };
  return (
    <div className={state ? "sidebar active" : "sidebar"}>
      <div className="mobile-nav" style={{ display: state ? "flex" : "none" }}>
        <img src={Multiply} alt="" onClick={handleClose} />
      </div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="links ">
        <NavLink
          to="/Admin"
          className={({ isActive }) => (isActive ? "link active " : "link ")}
        >
          <img src={layout} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to="/Admin/Users"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <img src={member} alt="" />
          <p>Users</p>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "link logout active" : "link logout"
          }
          onClick={() => dispatch(logout())}
        >
          <img src={logouts} alt="" />
          <p>Logout</p>
        </NavLink>
      </div>
      <div className="logger">
        <img src={ctn} alt="" />
        <p>
          <span className=" px-4">0</span>Risk, all systems are <br></br>
          operational
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
