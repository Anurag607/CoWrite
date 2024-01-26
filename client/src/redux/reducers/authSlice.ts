import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authInstance: null,
  },
  reducers: {
    setAuthInstance: (state: any, action: PayloadAction<any>) => {
      state.authInstance = action.payload;
    },
    destroyAuthInstance: (state: any) => {
      state.authInstance = null;
    },
  },
});

export const { setAuthInstance, destroyAuthInstance } = authSlice.actions;
export default authSlice.reducer;
