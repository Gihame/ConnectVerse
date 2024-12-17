import React, { useEffect, useState } from "react";
import url from "../utils/api-client";
import User from "../types/userType";
import { jwtDecode } from "jwt-decode";

const UserTable: React.FC = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [usersData,setUsersData ] = useState();

  const handleFetchUsers = async () => {
    const tokenData = localStorage.getItem("token-admin");
    const response = await fetch(url + "/api/v1/user/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (tokenData || ""),
      },
    });
    const responseData = await response.json();
    setAllUsers(responseData);
  };

  useEffect(() => {
      handleFetchUsers();
       const fetchUsers = async () => {
         const tokenDataa = localStorage.getItem("token-admin");
         const tokenEmails = jwtDecode(tokenDataa);
         const emailDatas = tokenEmails.sub;
         const response = await fetch(url + "/api/v1/user/getuserbyemail", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: "Bearer " + tokenDataa || "",
           },
           body: JSON.stringify({ email: emailDatas }),
         });
         // const response = await fetch(url + "/api/v1/welcome")
         const responseDataEmail = await response.json();
         setUsersData(responseDataEmail);
         console.log(responseDataEmail);
      };
      fetchUsers()
  }, []);

  const handleFollow = async (userId: number) => {
      console.log(`Follow user with ID: ${userId}`);
        const tokenData = localStorage.getItem("token-admin");
        const response = await fetch(url + "/api/v1/user/" + usersData?.id + "/follow/" + userId, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + (tokenData || ""),
          },
        });
        const responseData = await response.json();
        setAllUsers(responseData);
  };
console.log("UsersData", usersData)
  return (
    <div className="w-full p-4">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4">Profile Image</th>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Full Name</th>
            <th className="py-2 px-4">Bio</th>
            <th className="py-2 px-4">Location</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4">
                <img
                  src={user.profile.profileImageUrl}
                  alt={user.profile.username}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="py-2 px-4">{user.profile.username}</td>
              <td className="py-2 px-4">{user.profile.fullName}</td>
              <td className="py-2 px-4">{user.profile.bio}</td>
              <td className="py-2 px-4">{user.profile.location}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleFollow(user.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Follow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
