import { Action } from '../../config/interfaces';

export const AuthActionTypes = {
    AUTH_RESPONSE_SUCCESS: 'AUTH_RESPONSE_SUCCESS',
    AUTH_RESPONSE_ERROR: 'AUTH_RESPONSE_ERROR',

    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
};

export const apiResponseSuccess = (actionType: string, payload: Action): Action => ({
    type: actionType,
    payload: { actionType: payload.type, data: payload.payload },
});

export const apiResponseError = (actionType: string, payload: Action): Action => ({
    type: actionType,
    payload: { actionType: payload.type, data: payload.error },
});

export const loginUser = (username: string, password: string): Action => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { username, password },
});

export const logoutUser = (): Action => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});