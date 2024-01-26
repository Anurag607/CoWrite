import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const imgUploadSlice = createSlice({
  name: "imgUpload",
  initialState: {
    isImgUploading: false,
    progress: 0,
  },
  reducers: {
    openImageUploadIndicator: (state) => {
      state.isImgUploading = true;
    },
    closeImageUploadIndicator: (state) => {
      state.isImgUploading = false;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    clearProgress: (state) => {
      state.progress = 0;
    }
  },
});

export const { openImageUploadIndicator, closeImageUploadIndicator, updateProgress, clearProgress } = imgUploadSlice.actions;
export default imgUploadSlice.reducer;
