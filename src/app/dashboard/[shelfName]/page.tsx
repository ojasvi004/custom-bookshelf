"use client";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import SearchBar from "@/app/components/SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";

const BookshelfPage = () => {
  const [userId, setUserId] = useState("");
  const { shelfName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/me");
        setUserId(response.data.data.id);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        <h1>shelf name: {shelfName}</h1>
        {userId && shelfName ? (
          <SearchBar
            userId={userId}
            onBookSelect={(book) => console.log(book)}
            shelfName={shelfName}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Layout>
    </div>
  );
};

export default BookshelfPage;
