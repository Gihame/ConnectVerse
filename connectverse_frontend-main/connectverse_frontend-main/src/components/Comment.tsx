/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ReactNode, useRef, useState } from "react";
import username from "../assets/client.jpg";
import {
  PhotoIcon,
  VideoCameraIcon,
  MapPinIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";
import url from "../utils/api-client";

interface CommentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  dataReview: any;
  refId: number;
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

const Comment: React.FC<CommentProps> = ({
  isOpen,
  onClose,
  children,
  dataReview,
  refId,
}) => {
  const commentRef = useRef(null);
  const [tweetsData, settweetsData] = useState<Comment[]>();
  if (!isOpen) return null;
  console.log("Data Review", dataReview);
  console.log("Ref ID", refId);
  console.log(dataReview.tweet_id === refId);
  const handleAddComment = async () => {
    if (
      commentRef.current &&
      commentRef.current.value !== null &&
      commentRef.current.value !== ""
    ) {
      console.log("commentRef", commentRef.current.value);
      const tokenData = localStorage.getItem("token-admin");
      const response = await fetch(
        url + "/api/v1/tweet/" + dataReview.tweet_id + "/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenData || "",
          },
          body: JSON.stringify({ content: commentRef.current.value }),
        }
      );
      // const response = await fetch(url + "/api/v1/welcome")
      console.log("response save tweets", response);
      const responseDataTweet = await response.json();
      settweetsData(responseDataTweet);
      console.log(responseDataTweet);
    } else {
      // Display an error or handle the case where the value is null
      console.log("Input value is null. Cannot save.");
      toast.warning("enter a message");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1A1D21] rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>

        {children}

        <div className="tweetcontainer mt-4 rounded-md w-[45rem] p-2 px-4 ">
          <div className="top flex gap-4 pb-4 justify-between">
            <div className="flex gap-4">
              {/* <img src={username} alt="" className="w-10 rounded-3xl" /> */}
              {dataReview.imageUrl == null ? (
                <img src={username} alt="" className="w-10 rounded-3xl" />
              ) : (
                <img
                  src={dataReview.imageUrl}
                  alt=""
                  className="w-10 rounded-3xl"
                />
              )}
              <p className="items-center bg-transparent outline-none text-white">
                username
              </p>
            </div>
          </div>{" "}
          <h3 className="items-center bg-transparent outline-none text-white">
            {dataReview.message}
          </h3>
          <div className="pt-2">
            {dataReview.comments.map((comment, index) => (
              <p key={index} className="text-slate-400">
                {comment.content}
              </p>
            ))}
          </div>
        </div>

        <div className="tweetcontainer mt-4 bg-[#D9D9D9] bg-opacity-10 rounded-md  p-2 px-4">
          <div className="top flex gap-4 pb-6">
            <img src={username} alt="" className="w-12 rounded-3xl" />
            <input
              type="text"
              placeholder="What is happening?"
              className=" bg-transparent outline-none text-white"
              ref={commentRef}
            />
          </div>
          <div className="bottom flex justify-between">
            <div className="icons flex gap-12">
              <PhotoIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
              <VideoCameraIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
              <MapPinIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
              <FaceSmileIcon className="w-6 text-white group-hover:text-blue  hover:text-blue-600" />
            </div>
            <button
              className="bg-blue-700 px-6 py-1 text-white rounded-3xl"
              onClick={handleAddComment}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
