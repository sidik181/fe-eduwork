import { createSlice } from "@reduxjs/toolkit";


const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setLoading: () => true,
        unsetLoading: () => false
    },
})
export const { setLoading, unsetLoading}  = loadingSlice.actions;

export default loadingSlice.reducer
