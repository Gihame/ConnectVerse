import { PropsWithChildren, useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: PropsWithChildren<object>) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const tokenData = localStorage.getItem("token-admin");
    if (!tokenData) {
      navigate("/login");
    } else {
      const admin = JSON.parse(tokenData);
      if (admin) {
         navigate(location.pathname);
      } else {
        navigate("/home");
      }
    }
  }, [location.pathname, navigate]);

  return <div> {children} </div>
}

export default ProtectedRoutes;

