import {checkResponse} from "../utils/checkResponse";

const BASE_URL = "https://norma.nomoreparties.space/api"

const ingredientsListUrl = `${BASE_URL}/ingredients`;

export function loadIngredients() {
  return fetch(ingredientsListUrl)
  .then(checkResponse)
  // .then(data => {
  //   if (data.success) return data.data;
  // })
};

const orderDetailsUrl = `${BASE_URL}/orders`;

export function loadOrderDetails(newOrder) {
  return fetch(orderDetailsUrl, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(checkResponse)
    // .then(data => {
    //   if (data.success) return data;
    // })
}
