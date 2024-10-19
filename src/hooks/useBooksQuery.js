import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchBooks = async ({ queryKey }) => {
  const [_key, { search, genre, page }] = queryKey;
  const params = {
    search: search || "",
    topic: genre || "",
    page: page || 1,
  };
  const response = await axios.get("https://gutendex.com/books", { params });
  return response.data;
};

const useBooksQuery = ({ search, genre, page }) => {
  return useQuery({
    queryKey: ["books", { search, genre, page }],
    queryFn: fetchBooks,
  });
};

export default useBooksQuery;
