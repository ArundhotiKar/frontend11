import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Main = () => {
    const { role } = useContext(AuthContext);
    return (
        <div>
            <h1 className='mt-20 text-2xl font-bold text-center'>Welcome to <span className='text-red-600'>{role}</span> Dashboard</h1>
        </div>
    );
};

export default Main;