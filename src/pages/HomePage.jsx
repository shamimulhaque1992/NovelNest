import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import useBooksQuery, { fetchBooks } from "../hooks/useBooksQuery";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { GlobalContext } from "@/providers/GlobalProvider";

const genres = [
  "Children",
  "Fiction",
  "Adventure",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Mystery",
  "Historical",
  "Horror",
  "Biography",
  // Add more genres as needed
];

const HomePage = () => {
  const { search, setSearch, genre, setGenre, page, setPage } =
    useContext(GlobalContext);
  const queryClient = useQueryClient();

  // Fetch books using the custom hook
  const { data, isLoading, isError } = useBooksQuery({ search, genre, page });

  const totalPages = data ? Math.ceil(data.count / 32) : 0;

  // Prefetch the next page
  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["books", { search, genre, page: page + 1 }],
        queryFn: () =>
          fetchBooks({
            queryKey: ["books", { search, genre, page: page + 1 }],
          }),
      });
    }
  }, [data, page, search, genre, totalPages, queryClient]);

  return (
    <div className="container">
      {isLoading ? (
        <Spinner></Spinner>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching books.</p>
      ) : (
        <>
          <BookList books={data.results} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
