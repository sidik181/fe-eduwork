import { ADD_PRODUCT_TO_CART, REMOVE_CART_ITEM, UPDATE_PRODUCT_QUANTITY } from './constants'

export const addProductToCart = (product) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: product
});

export const updateQuantityProductToCart = (id, qty) => ({
    type: UPDATE_PRODUCT_QUANTITY,
    payload: { id, qty }
});

export const removeCartItem = (id) => ({
    type: REMOVE_CART_ITEM,
    payload: id,
});


// const { cart: { items } } = getState();
// const existingProduct = items.find(i => i.product. === payload.product);

// if (existingProduct) {
//     return {
//         type: UPDATE_QUANTITY,
//         payload: { id: payload._id, qty: qty },
//         operation: 'updateQtyToProduct',
//     }
//     const updatedQuantity = existingProduct.qty || qty;
//     let updatedQuantity
//     if (existingItem) {
//         updatedQuantity = 0
//     } else {
//         updatedQuantity = existingItem.qty + 1
//     }
//     dispatch({
//         type: UPDATE_QUANTITY,
//         payload: { id: item._id, qty: updatedQuantity }
//     });
// } else {
//     localStorage.setItem('cart', JSON.stringify(payload))
//     return {
//         type: ADD_TO_CART,
//         payload,
//         operation: 'addItemToCart',
//     }
// }