import { Toaster } from "sonner";
import { News, ProfileInfo } from "../components";
import Sidebar from "../components/Sidebar";
const Profile = () => {
  return (
    <div className="bg-[#0E1225] h-screen w-screen flex">
      <Toaster position="top-right" richColors />
      <Sidebar />
      <div className="main w-full">
        <ProfileInfo />
      </div>
      <div className="right">
        <News />
      </div>
    </div>
  );
};

export default Profile;
