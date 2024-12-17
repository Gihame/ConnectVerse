import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import "../styles/Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {  useState } from "react";
import url from "../utils/api-client";
import { Toaster, toast } from "sonner";
type Inputs = {
  email: string;
  firstname: string;
  password: string;
  lastname: string;
  username: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [formErrors, setFormErrors] = useState<Partial<Inputs>>({});
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
     const errors: Partial<Inputs> = {};

     if (!data.email) errors.email = "Email is required";
     if (!data.firstname) errors.firstname = "First name is required";
     if (!data.lastname) errors.lastname = "Last name is required";
     if (!data.password) errors.password = "Password is required";
     if (!data.username) errors.username = "Username is required";

     if (Object.keys(errors).length > 0) {
       setFormErrors(errors);
       return;
     }

    try {
      const requestBody = JSON.stringify({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        username: data.username,
      });
      setIsLoading(true)
      const response = await fetch(
       url + "/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
       toast.loading("Loading data from server...");
      const responseData = await response.json();
      setIsLoading(false)
      if (responseData.ok) {
        toast.success("Account created successfully!");
      }
        console.log(responseData);
        navigate("/login");
      reset();
    } catch (error) {
      setIsLoading(false)
      console.error("Error:", error);
    }
   
  };
   if (isLoading) {
     toast.loading("Sending Data to the Server...");
   }
  return (
    <div className="containers">
      <div className="container-quote">
        <div className="line">
          <h1>A wise Quote</h1>
          {/* <!-- <img src="../assests/Line 8.png" alt=""> --> */}
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
        <h1 className="text-1xl font-bold">Create Your Account</h1>
        <form className="formRegister" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <label>First Name</label>
            {formErrors.firstname && (
              <span className="p-0 m-0 text-red-500">
                {formErrors.firstname}
              </span>
            )}
            <input
              type="text"
              //   name="names"
              id="firstname"
              placeholder="Enter your Names"
              {...register("firstname")}
            />
          </div>
          <div className="inputs">
            <label>Last Name</label>
            {formErrors.lastname && (
              <span className="p-0 m-0 text-red-500">
                {formErrors.lastname}
              </span>
            )}
            <input
              type="text"
              //   name="names"
              id="lastname"
              placeholder="Enter your lastname"
              {...register("lastname")}
            />
          </div>
          <div className="inputs">
            <label>Email</label>
            {formErrors.email && (
              <span className="p-0 m-0 text-red-500">{formErrors.email}</span>
            )}

            <input
              type="email"
              //   name="email"
              id="email"
              placeholder="Enter your Email"
              {...register("email")}
            />
          </div>
          <div className="inputs">
            <label>Username</label>
            {formErrors.username && (
              <span className="p-0 m-0 text-red-500">
                {formErrors.username}
              </span>
            )}
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...register("username")}
            />
          </div>{" "}
          <div className="inputs">
            <label>Password</label>
            {formErrors.password && (
              <span className="p-0 m-0 text-red-500">
                {formErrors.password}
              </span>
            )}
            <input
              type="password"
              //   name="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          <div className="error"></div>
          <div className="btns">
            <button className="button">Sign Up</button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="reg" to="/Login">
            <span>Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
