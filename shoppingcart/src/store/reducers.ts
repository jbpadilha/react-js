import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../server/reducers/AuthenticationReducer';
import productReducer from '../server/reducers/ProductReducer';

export default combineReducers({
    authentication: authReducer,
    productReducer,
});
