import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const restaurantInfo = useSelector((state) => state?.restaurants?.restaurantAuth?.restaurantInfo);

    return (
        <div>
            <h1>Email: {restaurantInfo?.email}</h1>
            {/* You can display other details as needed */}
            <p>Name: {restaurantInfo?.password}</p>
            <p>Address: {restaurantInfo?.address}</p>
            {/* ... and so on */}
        </div>
    );
}

export default Dashboard;
