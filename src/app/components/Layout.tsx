import React, { ReactNode, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useParams } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  interface Bookshelf {
    id: string;
    name: string;
  }

  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);
  const { shelfName } = useParams();
  const [userId, setUserId] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/me");
        setBookshelves(response.data.data.shelves);
        setUserId(response.data.data.id); 

        console.log(response.data);
        console.log("bookshelves", response.data.data.shelves);
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
    <div>
      <div className="flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="text-3xl font-bold mb-4 text-stone-700 font-serif mt-4 ml-3"
        >
          My Books
        </Link>
        {/* <SearchBar userId={userId} onBookSelect={(book) => console.log(book)} /> */}
        <div className="mr-3">
          <LogoutButton />
        </div>
      </div>
      <hr />
      <ul>
        {bookshelves.map((shelf) => (
          <li key={shelf.id} className="ml-5 text-lg">
            <Link href={`/dashboard/${shelf.name}`}>
              <span
                className={`${
                  shelf.name === shelfName
                    ? "font-bold text-black"
                    : "text-teal-800"
                }`}
              >
                {shelf.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
