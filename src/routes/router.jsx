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
import UserManagement from "../Dashboard/UserManagement";
import ManageBooks from "../Dashboard/ManageBooks";
import Mywishlist from "../Dashboard/Wishlist";
import Main from "../Dashboard/Main";
import AdminRoutes from "./AdminRoutes";
import LibrarianRoutes from "./LibrarianRoutes";
import PaymentPage from "../Dashboard/PaymentPage";
import PaymentSuccess from "../pages/PaymentSuccess";

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
        path: "/books/:id",
        element: <PrivateRoute><BookDetails></BookDetails></PrivateRoute>
      },
      {
        path: 'pay-now',
        element:<PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
      },
      {
        path: "payment-success",
        element:<PaymentSuccess></PaymentSuccess>
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
        path: "",
        element: <Main></Main>
      },
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
        element: <LibrarianRoutes><AddBook></AddBook></LibrarianRoutes>
      },
      {
        path: "my-books",
        element: <LibrarianRoutes><MyBooks></MyBooks></LibrarianRoutes>
      },
      {
        path: "librarians-orders",
        element: <LibrarianRoutes><LibrarianOrders></LibrarianOrders></LibrarianRoutes>
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "all-users",
        element: <AdminRoutes><UserManagement></UserManagement></AdminRoutes>
      },
      {
        path: "manage-books",
        element: <AdminRoutes><ManageBooks></ManageBooks></AdminRoutes>
      },
      {
        path: "wishlist",
        element: <Mywishlist></Mywishlist>
      },


    ]
  }
]);

export default router;