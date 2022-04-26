/* eslint-disable default-param-last */

import { Action, State } from '../../config/interfaces';
import { ProductActionTypes } from '../actions/ProductAction';

const initialState: State = {
    products: [],
    loading: false,
};

const productReducer = (state: State = initialState, action: Action): any => {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case ProductActionTypes.LIST_PRODUCTS: {
                    return {
                        ...state,
                        products: action.payload.data,
                        loading: false,
                    };
                }
                case ProductActionTypes.ADD_PRODUCT: {
                    return {
                        ...state,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }

        case ProductActionTypes.PRODUCT_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case ProductActionTypes.LIST_PRODUCTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }
        case ProductActionTypes.LIST_PRODUCTS:
        case ProductActionTypes.ADD_PRODUCT:
            return { ...state, loading: true };
        default:
            return state;
    }
};

export default productReducer;
