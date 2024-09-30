"use client";
import { useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import SearchBar from "@/app/components/SearchBar";
import { useEffect, useState } from "react";
import ShowBooks from "@/app/components/ShowBooks";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

const BookshelfPage = () => {
  const [userId, setUserId] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); 
  const { shelfName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/me");
        setUserId(response.data.data.id);
      } catch (error) {
        console.log("error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let bookIds: string[];

        if (shelfName === "dashboard" || !shelfName) {
          const response = await axios.get("/api/book");
          bookIds = response.data.map((book: { id: string }) => book.id);
        } else {
          const response = await axios.get(`/api/book?shelf=${shelfName}`);
          bookIds = response.data.map((book: { id: string }) => book.id);
        }

        const bookDetails = await Promise.all(
          bookIds.map(async (bookId: string) => {
            const bookResponse = await axios.get(
              `https://www.googleapis.com/books/v1/volumes/${bookId}`
            );
            const volumeInfo = bookResponse.data.volumeInfo;

            return {
              id: bookId,
              title: volumeInfo.title,
              authors: volumeInfo.authors || ["unknown Author"],
              thumbnail: volumeInfo.imageLinks?.thumbnail || "",
            };
          })
        );

        setBooks(bookDetails);
      } catch (error) {
        console.log("error fetching books:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  }, [shelfName]);

  return (
    <div>
      <Layout>
        <h1>Shelf name: {shelfName || "All Books"}</h1>
        {userId ? (
          <div>
            <SearchBar
              userId={userId}
              onBookSelect={(book) => console.log(book)}
              shelfName={shelfName}
            />
            {loading ? ( 
              <Loader2 className="size-9 animate-spin" />
            ) : (
              <ShowBooks books={books} />
            )}
          </div>
        ) : (
          <Loader2 className="size-9 animate-spin" />
        )}
      </Layout>
    </div>
  );
};
export default BookshelfPage;
