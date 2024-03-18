import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarts } from '../../api/cart';

export const fetchCarts = createAsyncThunk(
    'cart/fetchCarts',
    async (_, { getState }) => {
        const state = getState();
        if (state.auth.isAuthenticated) {
            const response = await getCarts();
            return response.data.data
        }
        return [];
    }
);