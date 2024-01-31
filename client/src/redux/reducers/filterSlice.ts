import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isFilterOpen: false,
    filterValue: "",
  },
  reducers: {
    setFilterValue: (state: any, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    clearFilterValue: (state: any) => {
      state.filterValue = "";
    },
    openFilter: (state) => {
      state.isFilterOpen = true;
    },
    closeFilter: (state) => {
      state.isFilterOpen = false;
    },
  },
});

export const { openFilter, closeFilter, setFilterValue, clearFilterValue } =
  filterSlice.actions;
export default filterSlice.reducer;
