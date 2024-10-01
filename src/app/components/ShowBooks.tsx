import React from "react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
}

const ShowBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="p-4 bg-stone-50">
      {books.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="border border-stone-400 p-3 rounded-md bg-stone-100"
            >
              <div className="flex items-center">
                {book.thumbnail && (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-12 h-12 mr-3 rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium text-stone-800">
                    {book.title}
                  </h3>
                  <p className="text-sm text-stone-600">
                    {book.authors.join(", ")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stone-500">no books found for this shelf</p>
      )}
    </div>
  );
};

export default ShowBooks;
