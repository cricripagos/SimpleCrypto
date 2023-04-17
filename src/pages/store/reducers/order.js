import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fiat_amount: '',
    crypto_amount: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setFiatAmount: (state, action) => {
            state.fiat_amount = action.payload
        },
        setCryptoAmount: (state, action) => {
            state.crypto_amount = action.payload
        }
    }
})

export const { setFiatAmount, setCryptoAmount } = orderSlice.actions;

export default orderSlice.reducer;