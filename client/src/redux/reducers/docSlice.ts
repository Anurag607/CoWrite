import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { docType, documentType } from "@/utils/types";

const initialDoc = {
  id: "",
  title: "",
  emailID: "",
  color: "#E5E4E2",
  pinned: false,
  descImg: "",
  content: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as docType | documentType;

const DocSlice = createSlice({
  name: "Docs",
  initialState: {
    currentDoc: initialDoc,
    docData: [] as documentType[],
    backupData: [] as documentType[],
    focusedDoc: initialDoc,
    docAPI: "create",
  },
  reducers: {
    setCurrentDoc: (state, action: PayloadAction<docType | documentType>) => {
      state.currentDoc = action.payload;
    },
    clearCurrentDoc: (state) => {
      state.currentDoc = initialDoc;
    },
    setDocData: (state, action: PayloadAction<documentType[]>) => {
      state.docData = action.payload;
    },
    setBackupData: (state, action: PayloadAction<documentType[]>) => {
      state.backupData = action.payload;
    },
    clearDocData: (state) => {
      state.docData = [];
    },
    clearBackupData: (state) => {
      state.backupData = [];
    },
    removeDoc: (state, action: PayloadAction<string>) => {
      state.docData = state.docData.filter((doc) => doc._id !== action.payload);
      state.backupData = state.backupData.filter(
        (doc) => doc._id !== action.payload
      );
    },
    setFocusedDoc: (state, action: PayloadAction<docType | documentType>) => {
      state.focusedDoc = action.payload;
    },
    clearFocusedDoc: (state) => {
      state.focusedDoc = initialDoc;
    },
    alterDocAPI: (state, action: PayloadAction<string>) => {
      state.docAPI = action.payload;
    },
  },
});

export const {
  setCurrentDoc,
  clearCurrentDoc,
  setDocData,
  clearDocData,
  setBackupData,
  clearBackupData,
  removeDoc,
  setFocusedDoc,
  clearFocusedDoc,
  alterDocAPI,
} = DocSlice.actions;

export default DocSlice.reducer;
