import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchParam: "",
  },
  reducers: {
    setSearchParams: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
    clearSearchParams: (state) => {
      state.searchParam = "";
    },
  },
});

export const { setSearchParams, clearSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
