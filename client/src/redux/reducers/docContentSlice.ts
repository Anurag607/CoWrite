import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const docContentSlice = createSlice({
  name: "docContent",
  initialState: {
    docContent: "",
    isReadOnly: false,
  },
  reducers: {
    setDocContent: (state, action: PayloadAction<(string | boolean)[]>) => {
      state.docContent = action.payload[0] as string;
      state.isReadOnly = action.payload[1] as boolean;
    },
    clearDocContent: (state) => {
      state.docContent = "";
      state.isReadOnly = false;
    },
  },
});

export const { setDocContent, clearDocContent } = docContentSlice.actions;
export default docContentSlice.reducer;
