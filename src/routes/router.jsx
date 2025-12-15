import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../Dashboard/Dashboard";
import Aside from "../Dashboard/Aside";
import MyProfile from "../Dashboard/MyProfile";
import MyOrders from "../Dashboard/MyOrders";
import PrivateRoute from "./PrivateRoute";
import AddBook from "../Dashboard/AddBook";
import BooksList from "../pages/BooksList";
import BookDetails from "../pages/BookDetails";
import MyBooks from "../Dashboard/MyBooks";
import LibrarianOrders from "../Dashboard/LibrarianOrders";
import EditBook from "../Dashboard/EditBook";



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
      },
      {
        path: "books",
        element: <BooksList></BooksList>
      },
      {
        path:"/books/:id",
        element: <BookDetails></BookDetails>
      }
    ]

  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "orders",
        element: <MyOrders></MyOrders>
      },
      {
        path: "add-book",
        element: <AddBook></AddBook>
      },
      {
        path:"my-books",
        element:<MyBooks></MyBooks>
      },
      {
        path:"librarians-orders",
        element:<LibrarianOrders></LibrarianOrders>
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
    ]
  }
]);

export default router;