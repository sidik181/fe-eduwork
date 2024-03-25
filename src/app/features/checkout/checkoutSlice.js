import { createSlice } from "@reduxjs/toolkit";
import { checkoutOrder } from "./checkoutService";


const initialState = {
    selectedAddress: [],
    status: 'idle'
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        toggleAddress(state, action) {
            const addressId = action.payload;
            if (state.selectedAddress.includes(addressId)) {
                state.selectedAddress = state.selectedAddress.filter(id => id !== addressId);
            } else {
                state.selectedAddress.push(addressId);
            }
        },
        clearAddressState(state) {
            state.selectedAddress = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutOrder.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(checkoutOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkoutOrder.rejected, (state) => {
                state.status = 'failed';
            });
    }
})
export const { toggleAddress, clearAddressState } = checkoutSlice.actions;

export default checkoutSlice.reducer
