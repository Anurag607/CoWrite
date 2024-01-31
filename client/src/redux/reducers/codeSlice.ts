import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
  name: "code",
  initialState: {
    userData: null,
  },
  reducers: {
    setCodeUserData: (state: any, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    clearCodeUserData: (state: any) => {
      state.userData = null;
    },
  },
});

export const { setCodeUserData, clearCodeUserData } = codeSlice.actions;
export default codeSlice.reducer;
