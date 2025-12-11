import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Home = () => {
    const { role } = useContext(AuthContext);
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Home</h1>
            <p>User Role: <span className="text-blue-600">{role || "Not logged in"}</span></p>
        </div>
    );
};

export default Home;
