import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './constants'

export const addToCart = item => ({
    type: ADD_TO_CART,
    payload: item,
});

export const removeFromCart = itemId => ({
    type: REMOVE_FROM_CART,
    payload: { id: itemId },
});

export const updateQuantity = (itemId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { id: itemId, quantity },
});