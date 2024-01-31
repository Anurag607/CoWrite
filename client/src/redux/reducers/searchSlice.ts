import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchParams: "",
  },
  reducers: {
    setSearchParams: (state, action: PayloadAction<string>) => {
      state.searchParams = action.payload;
    },
    clearSearchParams: (state) => {
      state.searchParams = "";
    },
  },
});

export const { setSearchParams, clearSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
