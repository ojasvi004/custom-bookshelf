"use client";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";

const BookshelfPage = () => {
  const { shelfName } = useParams();

  return (
    <div>
      <Layout>
        <h1>shelf name: {shelfName}</h1>
      </Layout>
    </div>
  );
};

export default BookshelfPage;
