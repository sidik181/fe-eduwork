import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, deleteCartItem, loadCart, updateCartAsync } from './cartService';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        addItemState(state, action) {
            state.items.push(action.payload);
        },
        updateProductQuantityState: (state, action) => {
            const { id, qty } = action.payload;
            const existingProductIndex = state.items.findIndex(item => item.product._id === id);
            if (existingProductIndex !== -1) {
                state.items[existingProductIndex].qty = qty;
            }
        },
        updateQuantityState: (state, action) => {
            const { id, qty } = action.payload;
            const existingProduct = state.items.find(item => item._id === id);
            if (existingProduct) {
                state.existingProduct.qty = qty;
            }
        },
        removeItemState(state, action) {
            const { id } = action.payload;
            state.items = state.items.filter(item => item._id !== id);
        },
        clearCartState(state) {
            state.items = [];
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCart.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'succeeded';
            })
            .addCase(updateCartAsync.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(addItemToCart.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteCartItem.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(loadCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addItemToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCart.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateCartAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addItemToCart.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { addItemState, updateProductQuantityState, updateQuantityState, removeItemState, clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
