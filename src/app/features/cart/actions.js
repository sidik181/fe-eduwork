import { getCarts } from '../../api/cart';
import { ADD_PRODUCT_TO_CART, SET_CART_DATA, REMOVE_CART_ITEM, UPDATE_PRODUCT_QUANTITY, UPDATE_QUANTITY } from './constants'

export const loadCartFromDatabase = () => async (dispatch) => {
    try {
        const cartData = await getCarts()
        dispatch({ type: SET_CART_DATA, payload: cartData })
    } catch(err){
        console.error('Error loading cart data:', err);
    }
};

export const addProductToCart = (product) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: product
});

export const updateQuantityProductToCart = (id, qty) => ({
    type: UPDATE_PRODUCT_QUANTITY,
    payload: { id, qty }
});

export const updateQuantity = (id, qty) => ({
    type: UPDATE_QUANTITY,
    payload: { id, qty }
});

export const removeCartItem = (id) => ({
    type: REMOVE_CART_ITEM,
    payload: id,
});
