import {checkResponse} from "../utils/checkResponse";
import { fetchWithRefresh, BASE_URL } from './fetchWithRefresh';
import Cookies from "js-cookie";

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

const ingredientsListUrl = `${BASE_URL}/ingredients`;

export function loadIngredients() {
  return fetchWithRefresh(ingredientsListUrl)
};

const orderDetailsUrl = `${BASE_URL}/orders`;

export function loadOrderDetails(newOrder) {
  return fetchWithRefresh(orderDetailsUrl, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const forgotPasswordUrl = `${BASE_URL}/password-reset`;

export function forgotPassword(email) {

  return fetchWithRefresh(forgotPasswordUrl, {
    method: 'POST',
    body: JSON.stringify({
      email: email
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const resetPasswordUrl = `${BASE_URL}/password-reset/reset`;

export function resetPassword(password, token) {

  return fetchWithRefresh(resetPasswordUrl, {
    method: 'POST',
    body: JSON.stringify({
      password: password,
      token: token
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const loginUserUrl = `${BASE_URL}/auth/login`;

export function loginUser(userData) {
  return request(loginUserUrl, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const registerNewUserUrl = `${BASE_URL}/auth/register`;

export function registerNewUser(userData) {
  return request(registerNewUserUrl, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const logoutUserUrl = `${BASE_URL}/auth/logout`;

export function logoutUser() {
 
  return request(logoutUserUrl, {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
     }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const getUserDataUrl = `${BASE_URL}/auth/user`;

export function getUserData() {

  return fetchWithRefresh(getUserDataUrl, {
    method: 'GET',
    headers: {
      authorization: Cookies.get("accessToken")
    },
  })
}

export function setNewUserData(userData) {

  return fetchWithRefresh(getUserDataUrl, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: Cookies.get("accessToken")
    },
    body: JSON.stringify(userData),
  })
}
