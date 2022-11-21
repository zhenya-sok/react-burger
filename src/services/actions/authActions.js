import { registerNewUser, loginUser, logoutUser, getUserData, setNewUserData } from '../../utils/api';
import Cookies from 'js-cookie';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const CHECK_AUTH_SESSION= 'CHECK_AUTH_SESSION';

export const LOGOUT= 'LOGOUT';

export const GET_USER = 'GET_USER';

export const UPDATE_USER = 'UPDATE_USER';


export function register(userData) {
    return function (dispatch) {
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

export function login(userData) {
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
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

export function updateUser(userData) {
    return function (dispatch) {
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
