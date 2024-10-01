"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import CreateBookshelf from "../components/CreateBookshelf";
import ShowBooks from "../components/ShowBooks";

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
        console.log("userId", response.data.data.id);

        if (response.data.data.shelves.length > 0) {
          console.log(response.data.data.shelves[0].name);
        }
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("userId:", userId);
  }, [userId]);

  return (
    <Layout>
      <div className="flex justify-between">
        {/* {userId && <CreateBookshelf userId={userId} />} */}
      </div>
    </Layout>
  );
};

export default Dashboard;
