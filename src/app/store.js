import { combineReducers, applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
import {thunk} from 'redux-thunk'
import productReducer from './features/product/reducers';
import authReducer from './features/auth/reducers';
import loadingReducer from './features/loading/loadingSlice';
import cartReducer from './features/cart/cartSlice';
import checkoutReducer from './features/checkout/checkoutSlice';

const preloadedState = {
    auth: {
        user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : { user: null, token: null }
    },
    cart: {
        items: JSON.parse(localStorage.getItem('cart') || '[]'),
    }
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    products: productReducer,
    auth: authReducer,
    loading: loadingReducer,
    cart: cartReducer,
    checkout: checkoutReducer
});

const store = createStore(rootReducer, preloadedState, composeEnhancer(applyMiddleware(thunk)));

export default store;
