import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : { user: null, token: null },
    reducers: {
        userLogin: (state, action) => {
            const { user, token } = action.payload;
            localStorage.setItem('auth', JSON.stringify({user,token}));
            state.user = user;
            state.token = token;
        },
        userLogout: (state) => {
            localStorage.removeItem('auth');
            localStorage.removeItem('cart');
            state.user = null;
            state.token = null;
        },
    },
})
export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer
