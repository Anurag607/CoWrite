import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const editorImgSlice = createSlice({
  name: "editorImg",
  initialState: {
    editorImages: [],
  },
  reducers: {
    updateEditorImages: (state, action: PayloadAction<string[]>) => {
      state.editorImages = [...state.editorImages, ...action.payload];
    },
    clearEditorImages: (state) => {
      state.editorImages = [];
    },
  },
});

export const { updateEditorImages, clearEditorImages } = editorImgSlice.actions;
export default editorImgSlice.reducer;
