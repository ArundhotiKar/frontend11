import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const AdminRoutes = ({ children }) => {
    const { role } = useContext(AuthContext);
    if (role !== 'Admin') {
        return <div>
            <h2 className='text-center mt-20 text-3xl text-red-600'>Access Denied 🚫</h2>
            <p className='text-center mt-4 text-lg'>You do not have permission to view this page.</p>
        </div>;
    }
    return (
        children
    );
};

export default AdminRoutes;