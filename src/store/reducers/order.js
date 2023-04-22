import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fiat_amount: '',
    crypto_amount: null,
    payment_method: null,
    chosen_network: null,
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
        },
        setSelectedPaymentMethod: (state, action) => {
            state.payment_method = action.payload
        },
        setChosenNetwork: (state, action) => {
            state.chosen_network = action.payload
        }
    }
})

export const { setFiatAmount, setCryptoAmount, setSelectedPaymentMethod, setChosenNetwork } = orderSlice.actions;

export default orderSlice.reducer;