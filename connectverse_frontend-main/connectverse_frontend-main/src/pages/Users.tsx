import { useEffect, useState } from "react";
import Sidebar from "../components/AdminSidebar";
// import "../styles/sections/Admin.css";
import "../styles/Users.css";
import { jwtDecode } from "jwt-decode";
import url from "../utils/api-client";
interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  isAdmin: string
}
const Users = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [usersData, setUsersData] = useState<User[]>();
  const [token, setToken] = useState<string | null>();
   const [allUsers, setAllUsers] = useState<User[]>([]);
  const handleMenuOpen = () => {
    console.log("clicked");
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
useEffect(() => {
  const fetchTokenFromLocalStorage = async () => {
    const tokenData = localStorage.getItem("token-admin");
    if (tokenData) {
      try {
        const { token } = JSON.parse(tokenData);
        console.log(token)
        setToken(token);
      } catch (error) {
        console.error("Error processing token data:", error);
      }
    }
  };

  fetchTokenFromLocalStorage();
}, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://mybrandbackend-q8gq.onrender.com/api/users/getALL",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token" : token || ""
          },
        }
      );
      const {users} = await response.json();
      setUsersData(users);
    }
    if (token) {
      fetchUsers();
    }
  }, [token])
  console.log(token)
  console.log(usersData);
  const handleDeleteUser = async (id: string) => {
   await fetch("https://mybrandbackend-q8gq.onrender.com/api/users/delete/"+id, {
     method: "Delete",
     headers: {
       "Content-Type": "application/json",
       "x-auth-token": token || "",
     },
   });
    setUsersData(usersData?.filter((user) => user._id !== id));
  }
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
    handleFetchUsers()
   }, []);
    const handleFollow = async (userId: number) => {
      console.log(`Follow user with ID: ${userId}`);
      const tokenData = localStorage.getItem("token-admin");
      const response = await fetch(
        url + "/api/v1/user/" + userId,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + (tokenData || ""),
          },
        }
      );
      const responseData = await response.json();
      setAllUsers(responseData);
    };
  return (
    <div className="Container">
      <Sidebar state={menuOpen} setState={setMenuOpen} />
      {/* <div className="users-main">
        <div className="user-header">
          <h1>Users</h1>
          <button className="menu" onClick={handleMenuOpen}>
            Menu
          </button>
        </div>
        <div className="scrollable">
          <div className="users">
            {usersData?.map((user) => {
              return <div className="user" key={user._id}>
                <p>{user._id.length > 4 ? user._id.substring(0,4) : ""}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </div>
            })}
           
          </div>
        </div>
      </div> */}
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
                    src={user.profile?.profileImageUrl}
                    alt={user.profile?.username}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4">{user.profile?.username}</td>
                <td className="py-2 px-4">{user.profile?.fullName}</td>
                <td className="py-2 px-4">{user.profile?.bio}</td>
                <td className="py-2 px-4">{user.profile?.location}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleFollow(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
