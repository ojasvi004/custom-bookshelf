import React, { ReactNode, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useParams } from "next/navigation";
import CreateBookshelf from "./CreateBookshelf";
import SearchBar from "./SearchBar";
import { Heading1, Loader2 } from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";

const Layout = ({ children }: { children: ReactNode }) => {
  interface Bookshelf {
    id: string;
  }

  const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);
  const { shelfName } = useParams();
  const [userId, setUserId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleDelete = async (id: string) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: "/api/bookshelf",
        data: { bookshelfId: id },
      });
      console.log("bookshelf deleted:", response);
      setBookshelves(bookshelves.filter((shelf) => shelf.id !== id));
    } catch (error) {
      console.error("error deleting bookshelf:", error);
    }
  };

  function toggleEdit() {
    setIsEditMode((prev) => !prev);  
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="text-3xl font-bold mb-4 text-stone-700 font-serif mt-4 ml-3"
        >
          My Books
        </Link>
        {userId ? (
          <div className="flex justify-center mb-4 mt-5">
            <SearchBar
              userId={userId}
              onBookSelect={(book) => console.log("ojasvi", book)}
              shelfName={Array.isArray(shelfName) ? shelfName[0] : shelfName}
            />
          </div>
        ) : (
          <Loader2 className="size-9 animate-spin" />
        )}
        {/* <SearchBar userId={userId} onBookSelect={(book) => console.log(book)} /> */}
        <div className="mr-3">
          <LogoutButton />
        </div>
      </div>
      <hr />
      <h2 className="ml-4">Bookshelves <button onClick={toggleEdit} className="text-xs italic">(Edit)</button></h2>
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
            {isEditMode ? <button onClick={() => handleDelete(shelf.id)}><FaRegTrashCan className="text-red-700 text-base ml-1"/></button> : ''}
            
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        {userId && <CreateBookshelf userId={userId}/>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
