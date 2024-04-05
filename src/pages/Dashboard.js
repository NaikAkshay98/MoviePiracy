// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../css/Dashboard.css';


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Ensure that `user` is obtained correctly and has an `id`
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          toast.error('No user ID found');
          return;
        }
  
        // Make sure this URL matches the endpoint that works in Postman
        const response = await axios.get(`http://localhost:6070/api/users/${user.id}`);
  
        // Assuming the response data structure matches the one returned by your endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };
  
    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      
      <h1>Dashboard</h1>
      <p>Name: {userData.firstName} {userData.lastName}</p>
      <p>Email: {userData.email}</p>
       {/*Add more user data here */}

    </div>
  );
};

export default Dashboard;
