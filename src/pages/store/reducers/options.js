import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payment: {},
    network: {},
}

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setOptions: (state, action) => {
            state = action.payload
        },
        setPaymentOptions: (state, action) => {
            state.payment = action.payload
        },
        setNetworkOptions: (state, action) => {
            state.network = action.payload
        }
    }
})

export const { setOptions, setPaymentOptions, setNetworkOptions } = optionsSlice.actions;

export default optionsSlice.reducer;