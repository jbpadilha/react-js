import { all } from 'redux-saga/effects';
import authSaga from './authenticationSaga';
import productSaga from './productSaga';

export default function* rootSaga() {
    yield all([authSaga(), productSaga()]);
}
