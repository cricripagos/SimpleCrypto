import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    btn_disabled: true,
    step: 1,
    toast: {
        show: false,
        message: '',
        status: '',
        loading: false
    },
    invoice: null,
    btn_loading: false,
    btn_text: 'Continuar'
}

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState,
    reducers: {
        setBtnDisabled: (state, action) => {
        state.btn_disabled = action.payload
        },
        setStepForward: (state, action) => {
        state.step += action.payload ? action.payload : 1
        },
        setStepBackward: (state) => {
        state.step -= 1
        },
        setToast: (state, action) => {
            state.toast.show = action.payload.show
            state.toast.message = action.payload.message
            state.toast.status = action.payload.status
            state.toast.loading = action.payload.loading
        },
        resetToast : (state) => {
            state.toast = 
            {
                show: false,
                message: '',
                status: '',
                loading: false
            }
        },
        setInvoice: (state, action) => {
            state.invoice = action.payload
        },
        setBtnLoading: (state, action) => {
            state.btn_loading = action.payload
        },
        setBtnText: (state, action) => {
            state.btn_text = action.payload
        },
        resetBtnText: (state) => {
            state.btn_text = 'Continuar'
        }
    }
})

export const { setBtnDisabled, setStepForward, setStepBackward, setToast, resetToast, setInvoice, setBtnLoading, setBtnText, resetBtnText } = interactionsSlice.actions;

export default interactionsSlice.reducer;