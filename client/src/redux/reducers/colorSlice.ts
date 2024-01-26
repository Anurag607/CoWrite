import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    isColorFormOpen: false,
    docColor: "#E5E4E2",
  },
  reducers: {
    openColorForm: (state) => {
      state.isColorFormOpen = true;
    },
    closeColorForm: (state) => {
      state.isColorFormOpen = false;
    },
    setDocColor: (state, action: PayloadAction<string>) => {
      state.docColor = action.payload;
    },
    resetDocColor: (state) => {
      state.docColor = "#E5E4E2";
    },
  },
});

export const { openColorForm, closeColorForm, setDocColor, resetDocColor } =
  colorSlice.actions;
export default colorSlice.reducer;
