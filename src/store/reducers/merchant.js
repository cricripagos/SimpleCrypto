import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slug: null,
  name: null,
  id: null,
  keys: {},
};

export const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    setMerchant: (state, action) => {
      (state.name = action.payload.name),
        (state.slug = action.payload.slug),
        (state.id = action.payload.id),
        (state.keys.key_bch = action.payload.key_bch),
        (state.keys.key_btc = action.payload.key_btc),
        (state.keys.key_evm = action.payload.key_evm);
    },
  },
});

export const { setMerchant } = merchantSlice.actions;

export default merchantSlice.reducer;
