import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: [false, ""],
  showBottomSidebar: [false, ""],
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setShowSidebar: (state, action: PayloadAction<(boolean | string)[]>) => {
      state.showSidebar = action.payload;
    },
    setShowBottomBar: (state, action: PayloadAction<(boolean | string)[]>) => {
      state.showBottomSidebar = action.payload;
    },
  },
});

export const { setShowSidebar, setShowBottomBar } = drawerSlice.actions;

export default drawerSlice.reducer;
