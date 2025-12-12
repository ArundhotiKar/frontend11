import React from 'react';
import { Outlet } from 'react-router';
import Aside from './Aside';
import Navber from '../Component/Navber';

const Dashboard = () => {
    return (
        <div>
            <Navber></Navber>
            <Aside></Aside>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;