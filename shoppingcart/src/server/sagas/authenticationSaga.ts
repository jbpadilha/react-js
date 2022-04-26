import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { Action, ResponseGenerator } from '../../config/interfaces';
import { persistor } from '../..';
import { apiResponseError, apiResponseSuccess, AuthActionTypes } from '../actions/Authentication';
import { loginAuth, logoutAuth } from '../AuthServer';

function* login({ payload: { usernameOrEmail, password } }: any) {
    const payload: Action = {
        type: AuthActionTypes.LOGIN_USER,
    };
    try {
        const userObj: any = {
            usernameOrEmail,
            password,
        };
        const response: ResponseGenerator = yield call(loginAuth, userObj);
        const user: any = response.data;
        payload.payload = user;
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
    } catch (error: any) {
        payload.error = error;
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
    }
}

function* logout() {
    const payload: Action = {
        type: AuthActionTypes.LOGOUT_USER,
    };
    try {
        yield call(logoutAuth);
        yield put(apiResponseSuccess(AuthActionTypes.AUTH_RESPONSE_SUCCESS, payload));
        persistor.purge();
    } catch (error: any) {
        yield put(apiResponseError(AuthActionTypes.AUTH_RESPONSE_ERROR, payload));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}
export function* watchLogout(): any {
    yield takeLatest(AuthActionTypes.LOGOUT_USER, logout);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
    ]);
}

export default authSaga;
