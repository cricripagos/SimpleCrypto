import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fiat_amount: "",
  crypto_amount: null,
  payment_method: null,
  chosen_network: null,
  payment_process_id: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setFiatAmount: (state, action) => {
      state.fiat_amount = action.payload;
    },
    setCryptoAmount: (state, action) => {
      state.crypto_amount = action.payload;
    },
    setSelectedPaymentMethod: (state, action) => {
      state.payment_method = action.payload;
    },
    setChosenNetwork: (state, action) => {
      state.chosen_network = action.payload;
    },
    setPaymentProcessId: (state, action) => {
      state.chosen_network = action.payload;
    },
    resetOrder: (state) => {
      state.crypto_amount = null;
      state.payment_method = null;
      state.chosen_network = null;
      state.payment_process_id = null;
    },
  },
});

export const {
  setFiatAmount,
  setCryptoAmount,
  setSelectedPaymentMethod,
  setChosenNetwork,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
