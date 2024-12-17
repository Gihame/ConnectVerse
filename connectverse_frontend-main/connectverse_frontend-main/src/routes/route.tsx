import App from "../App";
import Admin from "../pages/Admin";
import Error from "../pages/Error";
import {Home, Profile} from "../pages/index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import UsersList from "../pages/UsersList";
// import ProtectedRoutes from "./ProtectedRoutes";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },

  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/userslist",
    element: <UsersList />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/Admin/Users",
    element: <Users />,
  },
  // {
  //   path: "/Admin/",
  //   element: (
  //     <ProtectedRoutes>
  //       <Admin />
  //     </ProtectedRoutes>
  //   ),
  // },
  // {
  //   path: "/Admin/Users",
  //   element: (
  //     <ProtectedRoutes>
  //       <Users />
  //     </ProtectedRoutes>
  //   ),
  // },
// {
  //   path: "/Admin/Emails",
  //   element: (
  //     <ProtectedRoutes>
  //       <Emails />
  //     </ProtectedRoutes>
  //   ),
  // },
  // {
  //   path: "/Admin/Projects",
  //   element: (
  //     <ProtectedRoutes>
  //       <Projects />
  //     </ProtectedRoutes>
  //   ),
  // },
  // {
  //   path: "/Admin/Blogs",
  //   element: (
  //     <ProtectedRoutes>
  //       <BlogsPage />
  //     </ProtectedRoutes>
  //   ),
  // },
];
