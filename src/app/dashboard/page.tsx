"use client"

import axios from 'axios';
import React, { useEffect } from 'react';

const Dashboard = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/me');
                console.log(response.data);
            } catch (error) {
                console.error('error fetching data:', error);
            }
        };

        fetchData(); 
    }, []); 

    return (
        <div>Dashboard</div>
    );
}

export default Dashboard;
