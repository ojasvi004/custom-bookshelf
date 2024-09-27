"use client";

import Layout from "../components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateBookshelf from "../components/CreateBookshelf";

const Dashboard = () => {
  const [userId, setUserId] = useState("");

  interface Bookshelf {
    id: string;
    name: string;
  }

  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/me");
        setUserId(response.data.data.id);
        setBookshelves(response.data.data.shelves);
        console.log(response.data);
          console.log("bookshelves", response.data.data.shelves);
          if (response.data.data.shelves.length > 0) {
              console.log(response.data.data.shelves[0].name);
              
          }    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between">
        {userId && <CreateBookshelf userId={userId} />}
        <div className="ml-auto mr-4 mt-2">
        </div>
        
      </div>
    </Layout>
  );
};

export default Dashboard;
