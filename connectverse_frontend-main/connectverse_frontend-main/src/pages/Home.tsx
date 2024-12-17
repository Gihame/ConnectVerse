import { useEffect, useState } from "react";
import { News } from "../components";
import Sidebar from "../components/Sidebar";
import Tweets from "../components/Tweets";
import { useNavigate } from "react-router-dom";
import url from "../utils/api-client";
import { jwtDecode } from "jwt-decode";
import User from "../types/userType";
import { Toaster, toast } from "sonner";

interface DecodedToken {
  sub: string;
  exp?: number;
}

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [usersData, setUsersData] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenFromLocalStorage = async () => {
      const tokenData = localStorage.getItem("token-admin");

      if (tokenData) {
        try {
          setToken(tokenData);
          const tokenEmail = jwtDecode<DecodedToken>(tokenData);
          const emailData = tokenEmail.sub;
          if (emailData) {
            fetchUsers(tokenData);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchTokenFromLocalStorage();
  }, [navigate]);

  const fetchUsers = async (tokenData: string) => {
    const tokenEmails = jwtDecode<DecodedToken>(tokenData);
    const emailDatas = tokenEmails?.sub;

    if (!emailDatas) {
      console.error("Email not found in token");
      return;
    }

    const response = await fetch(url + "/api/v1/user/getuserbyemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
      },
      body: JSON.stringify({ email: emailDatas }),
    });

    const responseDataEmail = await response.json();
    setUsersData(responseDataEmail);
  };

  const isTokenExpired = (token: string | null) => {
    if (!token) return true;

    const { exp } = jwtDecode<DecodedToken>(token);
    if (!exp) return true;

    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  };

  useEffect(() => {
    if (isTokenExpired(token)) {
      toast.error("Token has expired, please log back in");
      setTimeout(() => {
        navigate("/");
        localStorage.removeItem("token-admin");
      }, 3000);
    }
  }, [token, navigate]);

  return (
    <div className="bg-[#0E1225] h-screen w-screen flex p-0 m-0">
      <Toaster position="top-right" richColors />
      <Sidebar />
      <div className="main">
        <Tweets data={usersData} />
      </div>
      <div className="right">
        <News />
      </div>
    </div>
  );
};

export default Home;
