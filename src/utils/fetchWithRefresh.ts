import Cookies from "js-cookie";
import { checkResponse } from "./checkResponse";

export const BASE_URL = 'https://norma.nomoreparties.space/api';

const saveTokens = (refreshToken: string, accessToken: string) => {
  Cookies.set('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const refreshTokenRequest = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse)
}

export const fetchWithRefresh = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);

    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {

      const { refreshToken, accessToken } = await refreshTokenRequest();
      saveTokens(refreshToken, accessToken);

      if (options && options.headers) {
        (options.headers as Headers).set("Authorization", accessToken);
      }

      const res = await fetch(url, options);

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}
