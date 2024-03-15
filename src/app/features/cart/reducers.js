import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './constants'

const initialState = {
    items: [],
    count: 0
};

function cartReducer(state = initialState, { type, payload }) {
    let newItems
    switch (type) {
        case ADD_TO_CART:
            newItems = [...state.items, payload];
            return {
                ...state,
                items: newItems,
                count: newItems.reduce((total, item) => total + item.quantity, 0)
            };
        case REMOVE_FROM_CART:
            newItems = state.items.filter(item => item.id !== payload.id);
            return {
                ...state,
                items: newItems,
                count: newItems.reduce((total, item) => total + item.quantity, 0)
            };
        case UPDATE_QUANTITY:
            newItems = state.items.map(item =>
                item.id === payload.id ? { ...item, quantity: payload.quantity } : item
            );
            return {
                ...state,
                items: newItems,
                count: newItems.reduce((total, item) => total + item.quantity, 0)
            };
        default:
            return state;
    }
}

export default cartReducer;
