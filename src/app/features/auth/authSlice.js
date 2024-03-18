import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : { user: null, token: null },
    reducers: {
        setLoading: () => true,
        unsetLoading: () => false
    },
})
export const { setLoading, unsetLoading } = authSlice.actions;

export default authSlice.reducer
