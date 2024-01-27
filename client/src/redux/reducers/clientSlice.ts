import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    setClient: (state: any, action: PayloadAction<any>) => {
      let flag = false;
      state.clients.map((client: any) => {
        if (client.id === action.payload.id) {
          flag = true;
          return;
        }
      });
      if (flag) state.clients = [...state.clients, action.payload];
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
