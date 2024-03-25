import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrder } from '../../api/order';


export const checkoutOrder = createAsyncThunk(
    'cart/checkoutOrder',
    async (data) => {
        const response = await addOrder(data);
        return response.data
    }
)
