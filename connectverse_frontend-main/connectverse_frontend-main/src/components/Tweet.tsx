/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import username from "../assets/client.jpg";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Comment } from "./index";
import { useNavigate } from "react-router-dom";
import url from "../utils/api-client";
interface tweetDataIProps {
  tweetId: number;
  userImage: string | null;
  message: string;
  likesCount: number;
  commentsCount: number;
  min: string,
  tweetReview: any
  likesUser:any
}
const Tweet =  ({
  tweetId,
  userImage,
  message,
  likesCount,
  commentsCount,
  min,
  tweetReview,
  likesUser
}: tweetDataIProps) => {
  console.log(userImage);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = async () => {
    console.log("open modal", tweetId);
    // setModalOpen(!modalOpen);
    const tokenData = localStorage.getItem("token-admin");
    const response = await fetch(url + "/api/v1/tweet/" + tweetId, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData || "",
      },
      // body: JSON.stringify({ message: inputRef.current.value }),
    });
    // const response = await fetch(url + "/api/v1/welcome")
    console.log("response save tweets", response);
    const responseDataTweet = await response.json();
    if (responseDataTweet.ok) {
      // fetchtweet
    }
    console.log("DELETE TWEET",responseDataTweet)
  };
  const handleComment = () => {
    setModalOpen(!modalOpen);
    console.log("add Comment");
  };
  const navigate = useNavigate();
  const handleProfileClick = () => {
    // navigate("/profile/" + JSON.parse(likesUser));
    console.log(likesUser)
  };
  const convertToMin = (min) => {
    // const createdAt = "2024-05-22T20:55:44.398027";

    // Parse the createdAt timestamp into a Date object
    const createdAtDate = new Date(min);

    // Get the current time
    const currentTime = new Date();

    // Calculate the difference in milliseconds between the current time and createdAt
    const timeDifferenceMillis = currentTime - createdAtDate;

    // Convert milliseconds to minutes
    const timeDifferenceMinutes = Math.floor(
      timeDifferenceMillis / (1000 * 60)
    );

    console.log("Time difference in minutes:", timeDifferenceMinutes);
    return `${timeDifferenceMinutes} m`

  }
  const handleLikeClick = async () => {
    console.log("Like", tweetId)
     const tokenData = localStorage.getItem("token-admin");
     const response = await fetch(url + "/api/v1/tweet/" + tweetId+ "/like", {
       method: "POST",
       headers: {
         // "Content-Type": "application/json",
         Authorization: "Bearer " + tokenData || "",
       },
       // body: JSON.stringify({ message: inputRef.current.value }),
     });
     // const response = await fetch(url + "/api/v1/welcome")
     console.log("response like tweets", response);
     const responseDataTweet = await response.json();
     if (responseDataTweet.ok) {
       // fetchtweet
     }
     console.log("like TWEET", responseDataTweet);
  }
  return (
    <>
      {modalOpen && (
        <Comment isOpen={modalOpen} onClose={handleComment} dataReview={tweetReview} refId={tweetId}>
          <p className="text-black"></p>
        </Comment>
      )}
      <div className="tweetcontainer mt-4 border border-slate-700 rounded-md w-[58vw] p-2 px-4">
        <div className="top flex gap-4 pb-4 justify-between">
          <div className="flex gap-4">
            {userImage == null ? (
              <img
                src={username}
                alt=""
                className="w-10 rounded-3xl"
                onClick={handleProfileClick}
              />
            ) : (
              userImage && (
                <img
                  src={userImage}
                  alt=""
                  className="w-10 rounded-3xl"
                  onClick={handleProfileClick}
                />
              )
            )}
            <p
              className="items-center bg-transparent outline-none text-white"
              onClick={handleProfileClick}
            >
              username
            </p>
            <p className="text-white">{convertToMin(min)}</p>
          </div>
          <TrashIcon className="w-5 text-red-500" onClick={handleModal} />
        </div>{" "}
        <h3 className="items-center bg-transparent outline-none text-white">
          {message}
        </h3>
        <div className="bottom flex justify-between">
          <div className="icons flex gap-28 mt-6">
            <div className="flex items-center text-white gap-2">
              <ChatBubbleBottomCenterIcon
                className="w-6 text-white group-hover:text-blue  hover:text-blue-600"
                onClick={handleComment}
              />
              <p>{commentsCount}</p>
            </div>
            <ShareIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />

            <div className="flex items-center text-white gap-2">
              <HeartIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" onClick={handleLikeClick}/>
              <p>{likesCount}</p>
            </div>
            <div className="flex items-center text-white gap-2">
              <ChartBarIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
              <p>1432</p>
            </div>
            <ArrowUpTrayIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
