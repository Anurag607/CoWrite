import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    editorInstance: null,
  },
  reducers: {
    setEditorInstance: (state: any, action: PayloadAction<any>) => {
      state.editorInstance = action.payload;
    },
    destroyEditorInstance: (state: any) => {
      state.editorInstance = null;
    },
  },
});

export const { setEditorInstance, destroyEditorInstance } = editorSlice.actions;
export default editorSlice.reducer;
