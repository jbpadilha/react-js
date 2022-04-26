/* eslint-disable default-param-last */

import { Action, State } from '../../config/interfaces';
import { AuthActionTypes } from '../actions/Authentication';

const initialState: State = {
    user: {},
    accessToken: null,
    isAuthenticated: false,
    loading: false,
};

const authReducer = (state: State = initialState, action: Action): any => {
    switch (action.type) {
        case AuthActionTypes.AUTH_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        user: action.payload.data,
                        isAuthenticated: true,
                        accessToken: action.payload.data.token,
                        loading: false,
                    };
                }
                case AuthActionTypes.LOGOUT_USER: {
                    return {
                        ...state,
                        accessToken: null,
                        isAuthenticated: false,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }

        case AuthActionTypes.AUTH_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER: {
                    return {
                        ...state,
                        error: action.payload.error,
                        isAuthenticated: false,
                        loading: false,
                    };
                }
                default:
                    return state;
            }
        }
        case AuthActionTypes.LOGOUT_USER:
        case AuthActionTypes.LOGIN_USER:
            return { ...state, loading: true };
        default:
            return state;
    }
};

export default authReducer;
