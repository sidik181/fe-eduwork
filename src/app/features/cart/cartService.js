import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCart, deleteCart, editCart, getCarts } from '../../api/cart';

export const loadCart = createAsyncThunk(
    'cart/loadCart',
    async () => {
        const response = await getCarts();
        localStorage.setItem('cart', JSON.stringify(response.data))
        return response.data;
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (item) => {
        const response = await addCart(item);
        return response.data
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async ({ id, qty }) => {
        const response = await editCart(id, { qty });
        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteItem',
    async ({ id }, { getState }) => {
        const response = await deleteCart(id);
        if (response.status === 200) {
            const { cart } = getState();
            return cart.items.filter(item => item.id !== id);
        }
        throw new Error('Failed to delete cart item');
    }
);
