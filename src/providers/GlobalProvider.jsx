import React, { Component, createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
  // State related to wishlist
  const initialWishListState =
    JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(initialWishListState);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // States related to navbar
  const savedSearch = localStorage.getItem("search") || "";
  const savedGenre = localStorage.getItem("genre") || "";
  const savedPage = parseInt(localStorage.getItem("page"), 10) || 1;

  const [search, setSearch] = useState(savedSearch);
  const [genre, setGenre] = useState(savedGenre);
  const [page, setPage] = useState(savedPage);

  // Side effects for Wishlist
  // Update local storage whenever wishList state changes
  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));

    const newTotalQuantity = wishList.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
    localStorage.setItem("totalQuantity", newTotalQuantity);
  }, [wishList]);


  // Side effect for search, genre, page
  // Save search term to localStorage
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  // Save genre to localStorage
  useEffect(() => {
    localStorage.setItem("genre", genre);
  }, [genre]);

  // Save current page to localStorage
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  // Reset to page 1 when search or genre changes
  useEffect(() => {
    setPage(1);
  }, [search, genre]);


  // Wishlist functionality
  const addToWishList = (item) => {
    // Check if the item is already in the wishList

    const isItemInCart = wishList.some(
      (wishlistItem) => wishlistItem.id === item.id
    );

    if (isItemInCart) {
      // If the item is already in the wishList, remove it
      setWishList((prevWishList) =>
        prevWishList.filter((wishlistItem) => wishlistItem.id !== item.id)
      );
    } else {
      // If the item is not in the wishList, add it
      setWishList(
        (prevWishList) => [...prevWishList, { ...item, quantity: 1 }],
        () => {
          // Callback function after the state has been updated
          // Update local storage
          localStorage.setItem("wishList", JSON.stringify(wishList));
        }
      );
    }
  };
// Check the book is in wishlist already.
  const isInWishList = (itemId) => {
    const isInCart = wishList.find((item) => item.id === itemId);
    return isInCart;
  };

  const value = {
    wishList,
    addToWishList,
    totalQuantity,
    setTotalQuantity,
    isInWishList,
    search,
    setSearch,
    genre,
    setGenre,
    page,
    setPage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
