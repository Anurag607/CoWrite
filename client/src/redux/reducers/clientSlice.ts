import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    setClient: (state: any, action: PayloadAction<any>) => {
      state.clients = [action.payload, ...state.clients];
      console.log(state.clients);
    },
    removeClient: (state: any, action: PayloadAction<any>) => {
      state.clients = state.clients.filter(
        (client: any) => client.id !== action.payload
      );
    },
    clearClients: (state: any) => {
      state.clients = [];
    },
  },
});

export const { setClient, removeClient, clearClients } = clientSlice.actions;
export default clientSlice.reducer;
