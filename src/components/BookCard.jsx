import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BiSolidHeart } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { GlobalContext } from "@/providers/GlobalProvider";

const BookCard = ({ book }) => {
  const { addToWishList, isInWishList } = useContext(GlobalContext);

  const authors = book.authors.map((author) => author.name).join(", ");
  const genres = book.bookshelves.join(", ") || book.subjects.join(", ");

  // Get cover image if available
  const coverImage = book.formats["image/jpeg"] || "";

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col transition-transform justify-between transform hover:scale-105 hover:shadow-md">
      {coverImage && (
        <img
          src={coverImage}
          alt={book.title}
          className="w-full h-[250px] object-cover rounded-md mb-4"
        />
      )}
      <div className="flex flex-col justify-between items-between">
        <h2 className="text-xl font-agdasima font-semibold mb-2 text-gray-800 hover:text-blue-600">
          {book.title}
        </h2>
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-medium">Author:</span> {authors || "Unknown"}
        </p>
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-medium">Genre:</span> {genres || "N/A"}
        </p>
        <p className="text-gray-600 mb-4 text-sm">
          <span className="font-medium">ID:</span> {book.id}
        </p>
        <div className="flex justify-between items-center">
          <Link to={`/book/${book.id}`}>
            <button className="bg-indigo-600 hover:bg-teal-700 px-5 py-2 rounded-md text-white">
              Details
            </button>
          </Link>
          <button
            onClick={() => addToWishList(book)}
            className={`p-2 rounded-full transition-colors ${
              isInWishList(book.id)
                ? "text-red-600"
                : "text-gray-600 hover:text-red-600"
            } self-end`}
          >
            {isInWishList(book.id) ? (
              <BiSolidHeart size={24} />
            ) : (
              <CiHeart size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
