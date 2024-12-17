import {
  ArrowLongLeftIcon,
  CalendarIcon,
  HomeIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/client.jpg";
import gradient from "../assets/gradient.jpg";
import MenuLinks from "../utils/MenuLinks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "./index";
import User from "../types/userType";
import { jwtDecode } from "jwt-decode";
import url from "../utils/api-client";
const ProfileInfo = () => {
  const [selectedTab, setSelectedTab] = useState("Tweets");
  const [modalOpen, setModalOpen] = useState(false);
  const [allTweets, setAllTweets] = useState();
  const [token, setToken] = useState<string | null>();
  const [usersData, setUsersData] = useState<User>();
  const [email, setEmail] = useState("");
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();

  const handleModal = () => {
    console.log("open modal");
    setModalOpen(!modalOpen);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/Home");
  };

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
    const tokenEmails = jwtDecode(tokenDataa);
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
  console.log("User Data", usersData);
  const allTweetsData = async () => {
    console.log("Like", usersData?.id);
    const tokenData = localStorage.getItem("token-admin");
    const response = await fetch(url + "/api/v1/tweet/" + usersData?.id, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData || "",
      },
      // body: JSON.stringify({ message: inputRef.current.value }),
    });
    // const response = await fetch(url + "/api/v1/welcome")
    console.log("response all tweets", response);
    const responseDataTweet = await response.json();
    if (responseDataTweet.ok) {
      // fetchtweet
    }
    setAllTweets(responseDataTweet);
    console.log("ALL TWEET", responseDataTweet);
  };
  const allFollowersData = async () => {
    console.log("Like", usersData?.id);
    const tokenData = localStorage.getItem("token-admin");
    const response = await fetch(
      url + "/api/v1/follow/" + usersData?.id + "/follower-count",
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + tokenData || "",
        },
        // body: JSON.stringify({ message: inputRef.current.value }),
      }
    );
    // const response = await fetch(url + "/api/v1/welcome")
    console.log("response all tweets", response);
    const responseDataTweet = await response.json();
    if (responseDataTweet.ok) {
      // fetchtweet
    }
    setFollowers(responseDataTweet);
    console.log("ALL TWEET", responseDataTweet);
  };
  const allFollowingData = async () => {
    console.log("Like", usersData?.id);
    const tokenData = localStorage.getItem("token-admin");
    const response = await fetch(
      url + "/api/v1/follow/" + usersData?.id + "/following-count",
      {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + tokenData || "",
        },
        // body: JSON.stringify({ message: inputRef.current.value }),
      }
    );
    // const response = await fetch(url + "/api/v1/welcome")
    console.log("response all tweets", response);
    const responseDataTweet = await response.json();
    if (responseDataTweet.ok) {
      // fetchtweet,
    }
    setFollowing(responseDataTweet);
    console.log("ALL Follwoing: ", responseDataTweet);
  };
  useEffect(() => {
    allTweetsData();
    allFollowingData();
    allFollowersData();
  }, [usersData]);
  console.log("following-count", following?.count);
  return (
    <>
      {modalOpen && (
        <EditProfile
          isOpen={modalOpen}
          onClose={handleModal}
          dataId={usersData.id}
          imageUrl={usersData?.profile.profileImageUrl}
        >
          <p className="text-black"></p>
        </EditProfile>
      )}
      <div className="p-4 w-full">
        <div
          className="text-white flex gap-4 items-center hover:cursor-pointer hover:text-blue-400"
          onClick={handleHomeClick}
        >
          <ArrowLongLeftIcon className="w-6 text-white" />
          <p>{usersData?.username}</p>
        </div>
        <div className="pt-4 relative">
          {" "}
          <img
            src={usersData?.profile?.profileImageUrl}
            alt=""
            className="w-full h-56 object-cover"
          />
          <img
            src={usersData?.profile?.profileImageUrl}
            alt=""
            className=" absolute top-32 w-44 h-44 rounded-full object-cover"
          />
          <button
            className="bg-blue-700 ml-[45vw] mt-4 px-6 py-1 text-white rounded-3xl"
            onClick={handleModal}
          >
            Edit Profile
          </button>
        </div>
        <div className="userBio text-white pt-10">
          <h1>{usersData?.profile?.fullName}</h1>
          <h1>{usersData?.profile?.username}</h1>
          <h1>
            Followers <span className="text-slate-300 pl-4">{followers?.count}</span>
          </h1>
          <h1>
            Following{" "}
            <span className="text-slate-300 pl-4">{following?.count}</span>
          </h1>
          <div className="flex gap-12">
            <MenuLinks
              icon={UserIcon}
              text={usersData?.profile?.gender}
              route="/home"
            />
            <MenuLinks
              icon={MapPinIcon}
              text={usersData?.profile?.location}
              route="/home"
            />
            <MenuLinks
              icon={CalendarIcon}
              text={usersData?.profile?.joinDate}
              route="/home"
            />
          </div>
        </div>

        <div className="infomessage text-slate-300 border-b border-slate-600 flex justify-between mt-6">
          <p
            className={`cursor-pointer ${
              selectedTab === "Tweets" ? "text-white" : ""
            }`}
            onClick={() => handleTabClick("Tweets")}
          >
            Tweets
          </p>
          <p
            className={`cursor-pointer ${
              selectedTab === "Replies" ? "text-white" : ""
            }`}
            onClick={() => handleTabClick("Replies")}
          >
            Replies
          </p>
          <p
            className={`cursor-pointer ${
              selectedTab === "Media" ? "text-white" : ""
            }`}
            onClick={() => handleTabClick("Media")}
          >
            Media
          </p>
          <p
            className={`cursor-pointer ${
              selectedTab === "Likes" ? "text-white" : ""
            }`}
            onClick={() => handleTabClick("Likes")}
          >
            Likes
          </p>
        </div>
        <div className="content mt-6">
          {selectedTab === "Tweets" && (
            <div className="flex gap-2 text-slate-300">
              {/* <p>{allTweets?.id}</p> */}
              {/* <p>{allTweets?.message}</p> */}
            </div>
          )}
          {selectedTab === "Replies" && (
            <p className="text-white">Displaying Replies</p>
          )}
          {selectedTab === "Media" && (
            <p className="text-white">Displaying Media</p>
          )}
          {selectedTab === "Likes" && (
            <p className="text-white">
              {" "}
              <p>likes: {allTweets?.likesCount}</p>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
