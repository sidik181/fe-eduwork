import { ADD_PRODUCT_TO_CART, REMOVE_CART_ITEM, UPDATE_PRODUCT_QUANTITY } from './constants'

const initialState = {
    cart: []
}

function cartReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: [...state.cart, payload]
            };
        case UPDATE_PRODUCT_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item._id === payload.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            };
        case REMOVE_CART_ITEM: {
            return state
                .map(item => ({ ...item, qty: item._id === payload.item._id ? item.qty - 1 : item.qty }))
                .filter(item => item.qty > 0);
        }
        default:
            return state;
    }
}

export default cartReducer;
