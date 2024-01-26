import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    theme: "light",
    prefersDark: false,
  },
  reducers: {
    setTheme: (state: any, action: PayloadAction<string>) => {
      state.docColor = action.payload;
    },
    setPrefersDark: (state: any, action: PayloadAction<boolean>) => {
      state.prefersDark = action.payload;
    },
  },
});

export const { setTheme, setPrefersDark } = darkModeSlice.actions;
export default darkModeSlice.reducer;
