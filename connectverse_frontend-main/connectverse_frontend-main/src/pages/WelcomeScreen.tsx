import logo from "../assets/logo.png";
import "../styles/welcome.css";
import { UserIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import SocialMediaFeatures from "../utils/SocialMediaFeatures";
import { useNavigate } from "react-router-dom";
const WelcomeScreen = () => {
    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate("/login")
    }
  return (
    <div className="wcontainers h-screen w-screen bg-[#000000] ">
      <div className="header px-12 py-2 flex justify-between  ">
        <div className="logo ">
          <img src={logo} alt="" className="w-44" />
        </div>
        <div className="buttons group">
          <button className="flex border justify-center items-center border-white rounded-3xl px-8 py-1 text-white group-hover:bg-white group-hover:text-black" onClick={handleClickLogin}>
            <UserIcon className="size-4 text-white group-hover:text-black mr-2" />
            login
          </button>
        </div>
      </div>
      <div className="main flex flex-col justify-center items-center mt-40 mx-56 ">
        <h1 className="text-white text-6xl">
          <span className="text-[#9B92FF] ">Connecting</span> has never been
          easier.
        </h1>
        <h3 className="text-white pt-6">
          Welcome to a world where connecting with others has never been easier.
          Experience seamless interactions and forge meaningful relationships
          effortlessly. With our platform, the power of connectivity is at your
          fingertips, bringing people together like never before. Join us and
          embark on a journey where building connections is simple, intuitive,
          and truly transformative.
        </h3>
        <div className="group mt-4">
          <button className="flex border justify-center items-center border-white rounded-3xl px-8 py-2 text-white group-hover:bg-white group-hover:text-black" onClick={handleClickLogin}>
            Get Started
            <ArrowRightIcon className="size-4 text-white group-hover:text-black ml-2" />
          </button>
        </div>
      </div>
      <div className="features text-white flex justify-center flex-col mt-20 ">
        <h1 className="text-xl mx-56 text-center">Features</h1>
        <div className="group align-center ml-44 mt-8">
          <SocialMediaFeatures />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
