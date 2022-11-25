import {checkResponse} from "./checkResponse";
import { fetchWithRefresh, BASE_URL } from './fetchWithRefresh';
import Cookies from "js-cookie";

function request(url: string, options: object) {
  return fetch(url, options).then(checkResponse)
}

const ingredientsListUrl = `${BASE_URL}/ingredients`;

export function loadIngredients() {
  return fetchWithRefresh(ingredientsListUrl)
};

const orderDetailsUrl = `${BASE_URL}/orders`;

export function loadOrderDetails(newOrder: string[]) {
  return fetchWithRefresh(orderDetailsUrl, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

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

export function loginUser(userData: object []) {
  return request(loginUserUrl, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const registerNewUserUrl = `${BASE_URL}/auth/register`;

export function registerNewUser(userData: object []) {
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
  // Cookies.get("accessToken") может вернуть как undefined, так и строку, а headers имеют тип Record<string, string>
  // Поэтому мы должны отсеять undefined
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

export function setNewUserData(userData: object []) {

  return fetchWithRefresh(getUserDataUrl, {
    method: 'PATCH',
    // if (options && options.headers) {
    //   (options.headers as Headers).set("Authorization", accessToken);
    // }

    // Тут аналогично getUserData
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      // TODO: убрать `as string` и переписать как в getUserData
      authorization: Cookies.get("accessToken") as string
    },
    body: JSON.stringify(userData),
  })
}
