
import { Outlet } from 'react-router-dom';
import Navber from '../Component/Navber';
import Footer from '../Component/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
   

    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} />
            <Navber/>
            <Outlet/>
            <Footer />
        </div>
    );
};

export default Root;
