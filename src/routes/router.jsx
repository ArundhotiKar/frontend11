import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../Dashboard/Dashboard";
import Aside from "../Dashboard/Aside";
import MyProfile from "../Dashboard/MyProfile";
import MyOrders from "../Dashboard/MyOrders";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]

  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "profile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "orders",
        element: <MyOrders></MyOrders>
      }
    ]
  }
]);

export default router;