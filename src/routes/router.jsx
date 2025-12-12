import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../Dashboard/Dashboard";
import Aside from "../Dashboard/Aside";



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
    children:[
      {
         path:"main",
         element:<Aside></Aside>
      }
    ]
  }
]);

export default router;