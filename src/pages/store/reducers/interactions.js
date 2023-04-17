import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    btn_disabled: true,
    step: 1,
}

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState,
    reducers: {
        setBtnDisabled: (state, action) => {
        state.btn_disabled = action.payload
        },
        setStepForward: (state, action) => {
        state.step += 1
        },
        setStepBackward: (state, action) => {
        state.step -= 1
        }
    }
})

export const { setBtnDisabled, setStepForward, setStepBackward } = interactionsSlice.actions;

export default interactionsSlice.reducer;