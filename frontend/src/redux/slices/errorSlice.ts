import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setError(_state, action: PayloadAction<string>) {
      return action.payload;
    },
    clearError() {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
