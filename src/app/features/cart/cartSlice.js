import { createSlice } from '@reduxjs/toolkit';
import { fetchCarts } from './cartService';

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartData(state, action) {
            state.cart = action.payload;
        },
        addProductToCart(state, action) {
            state.cart.push(action.payload);
        },
        updateProductQuantity(state, action) {
            const index = state.cart.findIndex(item => item._id === action.payload.id);
            if (index !== -1) {
                state.cart[index].qty = action.payload.qty;
            }
        },
        removeCartItem(state, action) {
            const index = state.cart.findIndex(item => item._id === action.payload);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
    },
    extraReducers : (builder) => {
        builder.addCase(fetchCarts.fulfilled, (state, action) => {
            state.cart = action.payload
            localStorage.setItem('cart', JSON.stringify(action.payload))
        })
    }
});

export const { setCartData, addProductToCart, updateProductQuantity, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
