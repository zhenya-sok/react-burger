import { registerNewUser, loginUser, logoutUser, getUserData, setNewUserData } from '../../utils/api';
import Cookies from 'js-cookie';
import { IUserData, IUserLogin } from '../../types/types';
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
    UPDATE_USER
} from '../constants';
import { Dispatch } from 'redux';

export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly payload: IUserData;
}
export interface IRegisterUserErrorAction {
    readonly type: typeof REGISTER_USER_ERROR;
}


export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: IUserData;
}
export interface ILoginErrorAction {
    readonly type: typeof LOGIN_ERROR;
}


export interface ICheckAuthSessionAction {
    readonly type: typeof CHECK_AUTH_SESSION;
    readonly payload: string | undefined;
}


export interface ILogoutAction {
    readonly type: typeof LOGOUT;
    readonly payload: IUserData;
}


export interface IGetUserAction {
    readonly type: typeof GET_USER;
    readonly payload: IUserData;
}


export interface IUpdateUserAction {
    readonly type: typeof UPDATE_USER;
    readonly payload: IUserData;
}


export type TAuthActions = 
    | IRegisterUserRequestAction
    | IRegisterUserSuccessAction
    | IRegisterUserErrorAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginErrorAction
    | ICheckAuthSessionAction
    | ILogoutAction
    | IGetUserAction
    | IUpdateUserAction;


export function register(userData: IUserData) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        });
        registerNewUser(userData).then(res => {
            if (res && res.success) {
                Cookies.set('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload: res
                });
            } else {
                dispatch({
                    type: REGISTER_USER_ERROR
                });
            }
        })
        .catch(err => dispatch({ type: REGISTER_USER_ERROR }))
    };
}

export function login(userData: IUserLogin) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });
        loginUser(userData).then(res => {
            Cookies.set('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            if (res && res.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });
            } else {
                dispatch({
                    type: LOGIN_ERROR
                });
            }
        })
        .catch(err => dispatch({ type: LOGIN_ERROR }))
    };
}

export const checkAuthSession = () => {
    const accessToken = Cookies.get("accessToken");

    return {
        type: CHECK_AUTH_SESSION,
        payload: accessToken
    }
}

export function logout() {
    return function (dispatch: Dispatch<TAuthActions>) {
        logoutUser().then(res => {
            if (res && res.success) {
                Cookies.remove('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({
                    type: LOGOUT,
                    payload: res
                });
            }
        })
        .catch(err => alert(err))
    };
}

export function getUser() {
    return function (dispatch: Dispatch) {
        getUserData().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_USER,
                    payload: res.user
                });
            } 
        })
        .catch(err => alert(err))
    };
}

export function updateUser(userData: IUserData) {
    return function (dispatch: Dispatch) {
        setNewUserData(userData).then(res => {
            if (res && res.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: userData
                });
            } 
        })
        .catch(err => alert(err))
    };
}
