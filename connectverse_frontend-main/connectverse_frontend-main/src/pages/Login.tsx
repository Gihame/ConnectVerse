import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../styles/Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../state/auth/auth";
import url from "../utils/api-client";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";

type Inputs = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading },
  } = useForm<Inputs>();
   const [formErrors, setFormErrors] = useState<Partial<Inputs>>({});
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const errors: Partial<Inputs> = {};

      if (!data.email) errors.email = "Email is required";
    if (!data.password) errors.password = "Password is required";
     if (Object.keys(errors).length > 0) {
       setFormErrors(errors);
       return;
     }
    try {
      const requestBody = JSON.stringify({
        email: data.email,
        password: data.password,
      });
      const response = await fetch(url + "/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const responseData = await response.json();
      console.log(responseData.token);
      const decodedToken = jwtDecode(responseData.token);
      console.log(decodedToken)
      console.log(decodedToken.sub)
      if (decodedToken.sub == "ualiane27@gmail.com") {
        
        toast.success("Welcome again !");
        dispatch(login(responseData));

        navigate("/Admin");
      }
    else {
        // const tokenData = localStorage.getItem("token-admin");
        //  const tokenEmail = jwtDecode(tokenData);
        //  const emailData = tokenEmail.sub;
        //  console.log("email", emailData);
        dispatch(login(responseData));
        toast.success("successfully Logged in!");
        console.log('responseData', responseData)
         navigate("/Home");
        // localStorage.setItem("token-admin", JSON.stringify(responseData));
      }
      // if (responseData.isAdmin) {
      //   console.log("Admin Logged in");
      //   navigate("/Admin");
      //   return;
      // } else {
      //   navigate("/");
      // }
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };
   if (isLoading) {
     toast.loading("Sending Data to the Server...");
   }
  console.log(isLoading);
  return (
    <div className="containers">
      <div className="container-quote">
        <div className="line">
          <h1>A wise Quote</h1>
        </div>
        <div>
          <h1>Get Everything You Want</h1>
          <p>
            You can get anything you want , if you work hard. Trust the process
            , and stick to the plan
          </p>
        </div>
      </div>
      <div className="container-register">
        <Toaster position="top-right" richColors />
        <h1 className="text-5xl font-bold  ">Happening now</h1>
        <h1 className="text-2xl font-bold "> Join ConnectVerse Today</h1>
        <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <label>Email</label>
            {formErrors.email && (
              <span className="p-0 m-0 text-red-500">{formErrors.email}</span>
            )}
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              {...register("email")}
            />
          </div>

          <div className="inputs">
            <label>Password</label>
            {formErrors.password && (
              <span className="p-0 m-0 text-red-500">
                {formErrors.password}
              </span>
            )}
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          <div className="message"></div>
          <div className="btns">
            <button className="button rounded-xl" disabled={isLoading}>
              {isLoading ? "Sending Data...." : "Sign In"}
            </button>
          </div>
        </form>
        <p>
          Don't have an account{" "}
          <Link className="reg" to="/Register">
            <span>Sign Up</span>
          </Link>
        </p>
        <p>
          Go Back to the Homepage{" "}
          <Link className="reg" to="/">
            <span>Home</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
