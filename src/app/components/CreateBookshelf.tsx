import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

interface CreateBookshelfProps {
  userId: string;
}

const CreateBookshelf: React.FC<CreateBookshelfProps> = ({ userId }) => {
  const [bookshelfName, setBookshelfName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/bookshelf", {
        bookshelfName,
        userId,
      });

      if (response.data?.error) {
        setError(response.data.error);
      }
      console.log("bookshelf created:", response.data);
      setBookshelfName("");
    } catch (error) {
      console.error("error creating bookshelf:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4 ml-4">
      <h1 className="text-lg font-bold text-stone-700 font-serif mb-2">
        Add a Shelf:
      </h1>
      <div className="flex items-center">
        <Input
          type="text"
          value={bookshelfName}
          onChange={(e) => setBookshelfName(e.target.value)}
          className="border px-2 py-1 h-8 flex-grow w-40 text-xs rounded-full mr-2"
          required
        />
        {error && <p className="text-red-800 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-stone-700 rounded-md hover:bg-stone-600 text-white px-2 h-8 text-xs"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default CreateBookshelf;
