import { createSlice } from "@reduxjs/toolkit";


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: false,
    reducers: {
        setLoading: () => true,
        unsetLoading: () => false
    },
})
export const { setLoading, unsetLoading } = checkoutSlice.actions;

export default checkoutSlice.reducer
