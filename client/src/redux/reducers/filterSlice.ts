import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isFilterOpen: false,
  },
  reducers: {
    openFilter: (state) => {
      state.isFilterOpen = true;
    },
    closeFilter: (state) => {
      state.isFilterOpen = false;
    },
  },
});

export const { openFilter, closeFilter } = filterSlice.actions;
export default filterSlice.reducer;
