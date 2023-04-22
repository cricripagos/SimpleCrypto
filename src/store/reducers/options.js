import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payment: {},
    networks: {},
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
        setNetworksOptions: (state, action) => {
            state.networks = action.payload
        }
    }
})

export const { setOptions, setPaymentOptions, setNetworksOptions } = optionsSlice.actions;

export default optionsSlice.reducer;