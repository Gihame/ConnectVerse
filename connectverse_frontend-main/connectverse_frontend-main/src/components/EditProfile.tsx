import React, { ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import gradient from "../assets/gradient.jpg";
import url from "../utils/api-client";

interface CommentProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  dataId: number,
  imageUrl:string
}

interface EditProfileFormInputs {
  fullName: string;
  username: string;
  profileImage: string;
  bio: string;
  location: string;
}

const EditProfile: React.FC<CommentProps> = ({ isOpen, onClose ,dataId,imageUrl}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormInputs>();

  const onSubmit: SubmitHandler<EditProfileFormInputs> = async  (data) => {
    console.log(data);
    // Handle form submission logic here
        console.log("ID", dataId);
        const tokenData = localStorage.getItem("token-admin");
        const response = await fetch(url + "/api/v1/profile/" + dataId, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenData || "",
          },
          body: JSON.stringify(data ),
        });
        // const response = await fetch(url + "/api/v1/welcome")
        console.log("response all tweets", response);
        const responseDataTweet = await response.json();
        if (responseDataTweet.ok) {
          // fetchtweet
        }
        console.log("ALL PROFILE", responseDataTweet);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1A1D21] h-screen rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-4 relative">
          <img src={imageUrl} alt="" className="w-full h-56 object-cover" />
          <img
            src={imageUrl}
            alt=""
            className="absolute top-32 w-44 h-44 rounded-full object-cover"
          />
          <div className="mt-20 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-sm px-2 py-1 bg-transparent border border-slate-500 outline-none text-white"
              {...register("fullName")}
            />
            {errors.fullName && (
              <span className="text-red-500">Full name is required</span>
            )}

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-sm px-2 py-1 bg-transparent border border-slate-500 outline-none text-white"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}

            <input
              type="text"
              placeholder="Enter your profile image URL"
              className="w-full rounded-sm px-2 py-1 bg-transparent border border-slate-500 outline-none text-white"
              {...register("profileImage")}
            />
            {errors.profileImage && (
              <span className="text-red-500">
                Profile image URL is required
              </span>
            )}

            <input
              type="text"
              placeholder="Enter your bio"
              className="w-full rounded-sm px-2 py-1 bg-transparent border border-slate-500 outline-none text-white"
              {...register("bio")}
            />
            {errors.bio && (
              <span className="text-red-500">Bio is required</span>
            )}

            <input
              type="text"
              placeholder="Enter your location"
              className="w-full rounded-sm px-2 py-1 bg-transparent border border-slate-500 outline-none text-white"
              {...register("location")}
            />
            {errors.location && (
              <span className="text-red-500">Location is required</span>
            )}

            <button
              type="submit"
              className="bg-blue-700 ml-4 mt-4 px-6 py-2 text-white rounded-3xl"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
