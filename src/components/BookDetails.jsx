import React from "react";

const BookDetails = ({ book }) => {
  const authors = book.authors.map((author) => author.name).join(", ");
  const genres = book.bookshelves.join(", ") || book.subjects.join(", ");
  const coverImage = book.formats["image/jpeg"] || "";

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {coverImage && (
          <img
            src={coverImage}
            alt={book.title}
            className="w-full md:w-1/3 h-auto object-cover rounded-md shadow-sm"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Author:</span>{" "}
            {authors || "Unknown"}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Genre:</span>{" "}
            {genres || "N/A"}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">ID:</span> {book.id}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Languages:</span>{" "}
            {book.languages.join(", ")}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Media Type:</span>{" "}
            {book.media_type}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold text-gray-800">Download Count:</span>{" "}
            {book.download_count}
          </p>
          {book.copyright !== null && (
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-semibold text-gray-800">Copyright:</span>{" "}
              {book.copyright ? "Yes" : "No"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Available Formats:
        </h2>
        <ul className="list-disc pl-5 text-lg">
          {Object.entries(book.formats).map(([mime, url]) => (
            <li key={mime} className="mb-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {mime}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
