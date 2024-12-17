import {
  ArrowLeftEndOnRectangleIcon,
  BellIcon,
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
  EllipsisHorizontalCircleIcon,
  FireIcon,
  HomeIcon,
  QueueListIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import MenuLinks from "../utils/MenuLinks";
// import username from "../assets/client.jpg";
import { logout } from "../state/auth/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import url from "../utils/api-client";
import { jwtDecode } from "jwt-decode";
import User from "../types/userType";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>();
  const [usersData, setUsersData] = useState<User>();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTokenFromLocalStorage = async () => {
      const tokenData = localStorage.getItem("token-admin");
      console.log("tokenData", tokenData);
       console.log("token", token);

      if (tokenData) {
        try {
          // const { token } = JSON.parse(tokenData);
          // console.log(token);
          setToken(tokenData);
          const tokenEmail = jwtDecode(tokenData);
          const emailData = tokenEmail.sub;
          console.log("email", email)
        if (emailData) {
          setEmail(emailData);
        }
          fetchUsers(tokenData);
        } catch (error) {
          console.error("Error processing token data:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchTokenFromLocalStorage();
  }, []);

  const fetchUsers = async (tokenData: string) => {
    const tokenDataa = localStorage.getItem("token-admin");
    const tokenEmails = jwtDecode(tokenData);
    const emailDatas = tokenEmails.sub;
    const response = await fetch(url + "/api/v1/user/getuserbyemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData || "",
      },
      body: JSON.stringify({ email: emailDatas }),
    });
    // const response = await fetch(url + "/api/v1/welcome")
    const responseDataEmail = await response.json();
    setUsersData(responseDataEmail);
    console.log(responseDataEmail);
  };
  console.log("usersData", usersData);
  const handleLogout = () => {
    dispatch(logout()), navigate("/");
  };

  console.log("email",email)
  console.log("UsersData", usersData?.profile);
  return (
    <div>
      <div className="sidebar flex justify-between flex-col  p-3 w-[18vw] border-r border-slate-100 h-screen">
        <div className="logo ">
          <img src={logo} alt="" className="w-36" />
        </div>
        <div className="links flex-col justify-between ">
          <MenuLinks icon={HomeIcon} text="Home" route="/home" />
          <MenuLinks icon={FireIcon} text="Explore" route="/home" />
          <MenuLinks icon={BellIcon} text="Notifications" route="/home" />
          <MenuLinks
            icon={ChatBubbleBottomCenterIcon}
            text="Messages"
            route="/home"
          />
          <MenuLinks icon={QueueListIcon} text="Lists" route="/userslist" />
          <MenuLinks icon={UserPlusIcon} text="Communities" route="/home" />
          <MenuLinks icon={CheckBadgeIcon} text="Verified" route="/home" />
          <MenuLinks icon={UserCircleIcon} text="Profile" route="/profile" />
          <MenuLinks
            icon={EllipsisHorizontalCircleIcon}
            text="More"
            route="/home"
          />
        </div>
        <div className="profiles flex items-center justify-between">
          <div className="usesr flex">
            <img
              src={usersData?.profile?.profileImageUrl}
              alt=""
              className="w-12 object-cover rounded-3xl"
            />
            <div className="info text-white pl-4">
              <h4>
                {" "}
                {usersData && usersData?.profile?.fullName?.length > 12
                  ? usersData.profile?.fullName.substring(0, 10)
                  : usersData?.profile?.fullName}
              </h4>
              <p className="text-sm">

              {usersData && usersData?.profile?.username?.length > 12
                ? usersData.profile?.username.substring(0, 15)
                : usersData?.profile?.username}
                </p>
            </div>
          </div>
          <ArrowLeftEndOnRectangleIcon
            className="w-8 text-red-500 hover:cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
