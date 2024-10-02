import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Book {
  id: string; 
  title: string;
  authors: string[];
  thumbnail: string;
}

interface SearchBarProps {
  onBookSelect: (book: Book) => void;
  userId: string;
  shelfName: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onBookSelect, userId, shelfName }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBookSelect = async (book: Book) => {
    try {
      console.log("userId:", userId);

      const payload = {
        id: book.id,
        userId,
        customShelfName: shelfName,
      };

      const response = await axios.post("/api/book", payload);
      console.log("api response:", response.data);

      onBookSelect(book);
      setQuery("");
      setSuggestions([]);
    } catch (error) {
      console.error("error creating book:", error);
      alert("error occurred while adding the book.");
    }
  };

  const fetchBooks = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=5`
      );

      interface GoogleBooksItem {
        id: string;
        volumeInfo: {
          title: string;
          authors?: string[];
          imageLinks?: {
            thumbnail?: string;
          };
        };
      }

      const books = response.data.items.map((item: GoogleBooksItem) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ["unknown author"],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSuggestions(books);
    } catch (error) {
      console.error("error fetching the books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      fetchBooks(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search books"
        className="border border-gray-300 rounded-md p-2 w-96 focus:outline-none focus:ring-2 focus:ring-stone-500"
      />
      {loading && (
        <p className="text-gray-500">
        </p>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
          {suggestions.map((book) => (
            <li
              key={book.id}
              onClick={() => handleBookSelect(book)} 
              className="p-2 hover:bg-stone-200 cursor-pointer"
            >
              <div className="flex items-center">
                {book.thumbnail && (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-10 h-10 mr-3"
                  />
                )}
                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-sm text-gray-600">
                    {book.authors.join(", ")}
                  </p>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
