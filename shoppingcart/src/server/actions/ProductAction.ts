import { Action } from '../../config/interfaces';

export const ProductActionTypes = {
    PRODUCT_RESPONSE_SUCCESS: 'PRODUCT_RESPONSE_SUCCESS',
    PRODUCT_RESPONSE_ERROR: 'PRODUCT_RESPONSE_ERROR',

    LIST_PRODUCTS: 'LIST_PRODUCTS',
    ADD_PRODUCT: 'ADD_PRODUCT',
};

export const getProduct = (): Action => ({
    type: ProductActionTypes.LIST_PRODUCTS,
    payload: {},
});

export const addProduct = (product: any): Action => ({
    type: ProductActionTypes.ADD_PRODUCT,
    payload: product,
});