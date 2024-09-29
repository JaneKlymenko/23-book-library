import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import createBookWithId from "../../utils/createBookWithId";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      //   return [...state, action.payload];
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
      //   const index = state.findIndex((book) => book.id === action.payload);
      //   if (index !== -1) {
      //     state.splice(index, 1);
      //   }
    },
    toggleFavorite: (state, action) => {
      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavorite: !book.isFavorite }
      //       : book
      //   );
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithId(res.data, "API")));
    }
  } catch (error) {
    console.log("error fetching data", error);
  }
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
