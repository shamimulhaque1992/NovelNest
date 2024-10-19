import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";

const WishlistPage = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const wishList = JSON.parse(localStorage.getItem("wishList"));
    setWishList(wishList);
  }, [wishList]);

  return (
    <div>
      <h1 className="container w-11/12 px-11 mx-auto text-2xl font-bold mb-8">
        Wishlist
      </h1>
      <div className="container">
        <BookList books={wishList} />
      </div>
    </div>
  );
};

export default WishlistPage;
