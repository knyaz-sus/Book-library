import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./errorSlice";

export type Book = {
  title: string;
  author: string;
  isFavorite: boolean;
  id: string;
  sourse: string;
};

type CreateBook = {
  title: string;
  author: string;
};

type BooksInitialState = {
  books: Book[];
  isLoadingViaAPI: boolean;
};

const initialState: BooksInitialState = { books: [], isLoadingViaAPI: false };

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url: string, thunkAPI) => {
    try {
      const res = await axios.get<Book>(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError("Failed fetching new book from API"));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: {
      reducer(state, action: PayloadAction<Book>) {
        state.books.push(action.payload);
      },
      prepare(newBook: CreateBook, sourse: string) {
        return {
          payload: { ...newBook, id: uuidv4(), isFavorite: false, sourse },
        };
      },
    },
    removeBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter((book) => !(book.id === action.payload));
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const clickedBook = state.books.find(
        (book) => book.id === action.payload
      );
      if (clickedBook) clickedBook.isFavorite = !clickedBook.isFavorite;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload?.author && action.payload?.title) {
        state.books.push({
          ...action.payload,
          id: uuidv4(),
          isFavorite: false,
          sourse: "API",
        });
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export const { addBook, removeBook, toggleFavorite } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
