/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import username from "../assets/client.jpg";
import {
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { Tweet } from "./index";
import "../styles/Tweet.css"
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import User from "../types/userType";
import { jwtDecode } from "jwt-decode";
import url from "../utils/api-client";
// import User from "../types/userType";

interface Like {
  id: number;
}

interface Tweet {
  tweet_id: number;
  message: string;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  likes: Like[];
  comments: Comment[];
}
const Tweets = (data: any) => {
  const [token, setToken] = useState<string | null>();
  const [tweetsData, settweetsData] = useState<Tweet[]>();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const handleSaveTweet = async () => {

    if (inputRef.current && inputRef.current.value !== null && inputRef.current.value !== "") {
      console.log("inputRef", inputRef.current.value);
      const response = await fetch(url + "/api/v1/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token || "",
        },
        body: JSON.stringify({ message: inputRef.current.value }),
      });
      // const response = await fetch(url + "/api/v1/welcome")
      console.log("response save tweets", response);
      const responseDataTweet = await response.json();
      settweetsData(responseDataTweet);
      console.log(responseDataTweet);
    } else {
      // Display an error or handle the case where the value is null
      console.log("Input value is null. Cannot save.");
      toast.warning("enter a message")
    }
  }
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
          fetchTweets(tokenData);
        } catch (error) {
          console.error("Error processing token data:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchTokenFromLocalStorage();
  }, []);

 const fetchTweets = async (tokenData: string) => {
    const response = await fetch(url + "/api/v1/tweet/", {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData || "",
      },
      // body: JSON.stringify({ email: email }),
    });
    // const response = await fetch(url + "/api/v1/welcome")
    console.log("response tweets", response)
    const responseDataEmail = await response.json();
    settweetsData(responseDataEmail);
    console.log(responseDataEmail);
  };
  const isTokenExpired = (token: string | null | undefined) => {
    const tokenDatas = localStorage.getItem("token-admin");
    console.log("Tokenexp", tokenDatas);
    if (!tokenDatas) {
      console.log("TokenexpNot", token);

      return true;
    }

    const { exp } = jwtDecode(tokenDatas); // Decode token to get the expiration date
    if (!exp) return true;

    const currentTime = Date.now() / 1000; // Current time in seconds
    return exp < currentTime;
  };
  if (isTokenExpired(token)) {
    console.log("isTokenexp", isTokenExpired(token));
    toast.error("Token has expired, please log back in ");
  }
  const exps = isTokenExpired(token);

  useEffect(() => {
    if (exps) {
      console.log("exps");
      setTimeout(() => {
        navigate("/");
        localStorage.removeItem("token-admin");
      }, 3000);
    }
  }, [exps, navigate]);
  console.log("data", data)
  console.log("tweetsData", tweetsData)
  return (
    <div className="">
      <Toaster position="top-right" richColors />
      <h1 className="text-white  px-4">Home</h1>
      <div className="tweetcontainer mt-4 bg-[#D9D9D9] bg-opacity-10 rounded-md w-[58vw] p-2 px-4 mx-4">
        <div className="top flex gap-4 pb-6">
          <img
            src={data.data?.profile?.profileImageUrl}
            alt=""
            className="w-10 h-10 rounded-3xl object-cover"
          />
          <input ref={inputRef}
            type="text"
            placeholder="What is happening?"
            className=" bg-transparent outline-none text-white"
          />
        </div>
        <div className="bottom flex justify-between">
          <div className="icons flex gap-12">
            <PhotoIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
            <VideoCameraIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
            <MapPinIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
            <FaceSmileIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
          </div>
          <button onClick={handleSaveTweet} className="bg-blue-700 px-6 py-1 text-white rounded-3xl">
            Tweet
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll h-[70vh] px-2 pt-6">
        {tweetsData &&
          tweetsData.map((tweet, index) => (
            <div key={index}>
              {/* <p>{index}</p> */}
              {/* <p>{tweet.message}</p> */}
              <Tweet userImage={tweet.imageUrl} message={tweet.message} likesCount={tweet.likesCount} commentsCount={tweet.comments.length} tweetId={tweet.tweet_id} min={tweet.createdAt} tweetReview={tweet} likesUser={tweet.likes} />
            </div>
          ))}
        {/* <Tweet /> */}
        {/* <Tweet /> */}
        {/* <Tweet /> */}
      </div>
    </div>
  );
};

export default Tweets;
