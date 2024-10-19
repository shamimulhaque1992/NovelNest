import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookDetails from "../components/BookDetails";
import Spinner from "@/components/Spinner";

const fetchBook = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const response = await axios.get(`https://gutendex.com/books/${id}`);
  return response.data;
};

const BookDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["book", id],
    queryFn: fetchBook, // Directly passing the fetchBook function here
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  return (
    <div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching book details.</p>
      ) : data.detail ? (
        <p className="text-center text-red-500">{data.detail}</p>
      ) : (
        <BookDetails book={data} />
      )}
    </div>
  );
};

export default BookDetailsPage;
