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
    name: string; 
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
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <Link
          href={"/dashboard"}
          className="text-3xl font-bold text-stone-700 font-serif"
        >
          My Books
        </Link>
        {userId ? (
          <div className="w-96">
            <SearchBar
              userId={userId}
              onBookSelect={(book) => console.log("Selected book:", book)}
              shelfName={Array.isArray(shelfName) ? shelfName[0] : shelfName}
            />
          </div>
        ) : (
          <Loader2 className="animate-spin w-6 h-6" />
        )}
        <div>
          <LogoutButton />
        </div>
      </div>

      <div className="flex h-full">
        <div className="w-1/4 p-4 bg-gray-100 h-full">
          <h2 className="text-xl mb-4">
            Bookshelves
            <button onClick={toggleEdit} className="text-xs italic">
              (Edit)
            </button>
          </h2>
          <ul>
            {bookshelves.map((shelf) => (
              <li key={shelf.id} className="mb-2">
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
                {isEditMode && (
                  <button onClick={() => handleDelete(shelf.id)}>
                    <FaRegTrashCan className="text-red-700 text-base ml-1" />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {userId && <CreateBookshelf userId={userId} />}
        </div>

        <div className="w-3/4 p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
