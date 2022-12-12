import {checkResponse} from "./checkResponse";
import { fetchWithRefresh, BASE_URL } from './fetchWithRefresh';
import Cookies from "js-cookie";
import { IRegisrerUser, IUser, IUserLogin } from "../types/authTypes";

function request(url: string, options: object) {
  return fetch(url, options).then(checkResponse)
}

const ingredientsListUrl = `${BASE_URL}/ingredients`;

export function loadIngredients() {
  return fetchWithRefresh(ingredientsListUrl)
};

const orderDetailsUrl = `${BASE_URL}/orders`;

export function loadOrderDetails(newOrder: object) {
  const accessToken = Cookies.get("accessToken");

  if (typeof accessToken === 'string') {
    return fetchWithRefresh(orderDetailsUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: accessToken
      },
      body: JSON.stringify(newOrder)
    })
  }
}

export const getOrderById = (orderId: string) => {
  const orderInfoUrl = `${BASE_URL}/orders/"${orderId}"`;

  return request(orderInfoUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
};

const forgotPasswordUrl = `${BASE_URL}/password-reset`;

export function forgotPassword(email: string) {

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

export function resetPassword(password: string, token: string) {

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

export function loginUser(userData: IUserLogin) {
  return request(loginUserUrl, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const registerNewUserUrl = `${BASE_URL}/auth/register`;

export function registerNewUser(userData: IRegisrerUser) {
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
  const accessToken = Cookies.get("accessToken");

  if (typeof accessToken === 'string') {
    return fetchWithRefresh(getUserDataUrl, {
      method: 'GET',
      headers: {
        authorization: accessToken
      },
    })
  }
}

export function setNewUserData(userData: IUser) {
  const accessToken = Cookies.get("accessToken");

  if (typeof accessToken === 'string') {
    return fetchWithRefresh(getUserDataUrl, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken
      },
      body: JSON.stringify(userData),
    })
  }
}
