import { combineReducers, applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
import {thunk} from 'redux-thunk'
import productReducer from './features/product/reducers';
import authReducer from './features/auth/reducers';
import loadingReducer from './features/loading/reducers';
import cartReducer from './features/cart/reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    products: productReducer,
    auth: authReducer,
    loading: loadingReducer,
    cart: cartReducer
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;