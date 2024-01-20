import { createSlice } from "@reduxjs/toolkit";

const docContentSlice = createSlice({
  name: "docContent",
  initialState: {
    docContent: "",
  },
  reducers: {
    setDocContent: (state, action) => {
      state.docContent = action.payload;
    },
    clearDocContent: (state) => {
      state.docContent = "";
    },
  },
});

export const { setDocContent, clearDocContent } = docContentSlice.actions;
export default docContentSlice.reducer;
