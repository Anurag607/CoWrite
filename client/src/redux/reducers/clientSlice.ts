import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    setClient: (state: any, action: PayloadAction<any>) => {
      let flag = false;
      for (let i = 0; i < state.clients.length; i++) {
        if (state.clients[i] === action.payload) {
          flag = true;
          break;
        }
      }
      if (!flag) state.clients = [...state.clients, action.payload];
      console.log(state.clients);
    },
    removeClient: (state: any, action: PayloadAction<any>) => {
      state.clients = state.clients.filter(
        (client: any) => client !== action.payload
      );
    },
    clearClients: (state: any) => {
      state.clients = [];
    },
  },
});

export const { setClient, removeClient, clearClients } = clientSlice.actions;
export default clientSlice.reducer;
