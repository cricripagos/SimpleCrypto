import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slug: null,
    id: null,
    keys: {}
}

export const merchantSlice = createSlice({
    name: 'merchant',
    initialState,
    reducers: {
        setSlug: (state, action) => {
            state.slug = action.payload
        }
    }
})

export const { setSlug } = merchantSlice.actions;

export default merchantSlice.reducer;