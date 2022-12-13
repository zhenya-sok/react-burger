import { IUser, IUserData } from '../../../types/authTypes';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    CHECK_AUTH_SESSION,
    LOGOUT,
    GET_USER,
    UPDATE_USER,
} from '../../constants';
import { TAuthActions } from '../../actions/authActions';

type TAuthState = {
    user: undefined | IUserData | IUser;
    registerRequest: boolean;
    registerError: boolean;
    loginRequest: boolean;
    loginError: boolean;
    token: undefined | string;
}

export const initialState: TAuthState = {
    user: undefined,
    registerRequest: false,
    registerError: false,
    loginRequest: false,
    loginError: false,
    token: undefined,
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState  => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerError: false,
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                registerError: false,
                user: action.payload,
                registerRequest: false,
                token: action.payload?.accessToken
            }
        }
        case REGISTER_USER_ERROR: {
            return {
                ...state,
                registerError: true,
                registerRequest: false,
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginError: false,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginError: false,
                user: action.payload?.user,
                token: action.payload?.accessToken,
                loginRequest: false,
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: true,
                loginRequest: false
            }
        }
        case CHECK_AUTH_SESSION: {
            return {
                ...state,
                token: action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: undefined,
                token: undefined,
            }
        }
        case GET_USER: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                user: action.payload,
            }
        }
    }

    return state
}