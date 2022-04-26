import { ProductActionTypes } from "../actions/ProductAction";
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { Action, ResponseGenerator } from '../../config/interfaces';
import { persistor } from '../..';
import { apiResponseError, apiResponseSuccess } from '../actions/Authentication';
import { createProduct, getProducts } from '../ProductServer';

function* addProduct({ product }: any) {
    const payload: Action = {
        type: ProductActionTypes.ADD_PRODUCT,
    };
    try {
        yield call(createProduct, product);
        yield put(apiResponseSuccess(ProductActionTypes.PRODUCT_RESPONSE_SUCCESS, payload));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(ProductActionTypes.PRODUCT_RESPONSE_ERROR, payload));
    }
}

function* listProducts() {
    const payload: Action = {
        type: ProductActionTypes.LIST_PRODUCTS,
    };
    try {
        const response: ResponseGenerator = yield call(getProducts);
        const products: any = response.data;
        payload.payload = products;
        yield put(apiResponseSuccess(ProductActionTypes.PRODUCT_RESPONSE_SUCCESS, payload));
        persistor.purge();
    } catch (error: any) {
        yield put(apiResponseError(ProductActionTypes.PRODUCT_RESPONSE_ERROR, payload));
    }
}

export function* watchListProducts(): any {
    yield takeEvery(ProductActionTypes.LIST_PRODUCTS, listProducts);
}
export function* watchAddProduct(): any {
    yield takeLatest(ProductActionTypes.ADD_PRODUCT, addProduct);
}

function* authSaga(): any {
    yield all([
        fork(watchListProducts),
        fork(watchAddProduct),
    ]);
}

export default authSaga;
