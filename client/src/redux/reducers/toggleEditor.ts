import { createSlice } from "@reduxjs/toolkit";

const toggleEditorSlice = createSlice({
  name: "toggleEditor",
  initialState: {
    toggleEditor: "text",
  },
  reducers: {
    switchEditor: (state, action) => {
      state.toggleEditor = action.payload;
    },
  },
});

export const { switchEditor } = toggleEditorSlice.actions;
export default toggleEditorSlice.reducer;
