import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    btn_disabled: true,
    step: 1,
    toast: {
        show: false,
        message: '',
        status: '',
        loading: false
    }
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
        },
        setToast: (state, action) => {
            state.toast.show = action.payload.show
            state.toast.message = action.payload.message
            state.toast.status = action.payload.status
            state.toast.loading = action.payload.loading
        }
    }
})

export const { setBtnDisabled, setStepForward, setStepBackward, setToast } = interactionsSlice.actions;

export default interactionsSlice.reducer;