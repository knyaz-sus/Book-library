import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  title: string;
  author: string;
  onlyFavorite: boolean;
};

const initialState: FilterState = {
  title: "",
  author: "",
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setFilterAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setOnlyFavorite(state, action: PayloadAction<boolean>) {
      state.onlyFavorite = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setFilterTitle,
  setFilterAuthor,
  setOnlyFavorite,
  resetFilters,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
