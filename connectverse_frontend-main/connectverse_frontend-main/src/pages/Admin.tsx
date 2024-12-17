import Sidebar from "../components/AdminSidebar";
import "../styles/Admin.css";
import bell from "../assets/Doorbell.png";
import MyPicture from "../assets/A-removebg-preview.png"
import Menu from "../assets/Menu.png";
import PadLock from "../assets/Padlock.png";
import ellips from "../assets/Ellipsis.png";
import Email from "../assets/Email.png";
import project from "../assets/Project.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { logout } from "../state/auth/auth";
import { useDispatch } from "react-redux";
import AreaChartComponent from "../components/AreaChart";
import { Toaster, toast } from "sonner";
const Admin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const handleMenuOpen = () => {
    console.log("clicked");
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  useEffect(() => {
  toast.success("Welcome Again, Admin")
}, [])
  return (
    <div className="adminContainer">
      <Sidebar state={menuOpen} setState={setMenuOpen} />
      <Toaster position="top-right" richColors />
      <div className="mains">
        <div className="headers">
          <div className="info">
            <p>tuyishimehope01@gmail.com</p>
            <h3>Tuyishime Hope</h3>
          </div>
          <div className="user">
            <img src={bell} alt="" />
            <img src={MyPicture} alt="" className="img" />
            <Link
              className="logouts"
              to={"/"}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
            <div className="link menu" id="logout">
              <button className="menu">
                <img src={Menu} alt="" onClick={handleMenuOpen} />
              </button>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card user">
            <div className="row1">
              <div>
                <img src={PadLock} alt="" />
                <p>Endpoints</p>
              </div>
              <div>
                <img src={ellips} alt="" />
              </div>
            </div>
            <div className="row2">
              <p>25</p>
              <a href="./UserPage.html">View All</a>
            </div>
          </div>
          <div className="card user">
            <div className="row1">
              <div>
                <img src={Email} alt="" />
                <p>Users</p>
              </div>
              <div>
                <img src={ellips} alt="" />
              </div>
            </div>
            <div className="row2 ">
              <p className="cEmail">12</p>
              <a href="./EmailsPage.html">View All</a>
            </div>
          </div>
          <div className="card user">
            <div className="row1">
              <div>
                <img src={project} alt="" />
                <p>Projects</p>
              </div>
              <div>
                <img src={ellips} alt="" />
              </div>
            </div>
            <div className="row2">
              <p>50</p>
              <a href="./ProjectsPage.html">View All</a>
            </div>
          </div>
        </div>
        {/* <div id="curve_chart" style={{ height: "65vh", width: "80vw" }}></div> */}
        <div className="mobile">
          <h2>Income</h2>
          <p>10,000,000 RWF</p>
          <span>2-05-2024</span>
        </div>
        <div className="mt-12 h-96 w-full">
          <AreaChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Admin;
