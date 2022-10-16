const ingredientsListUrl = "https://norma.nomoreparties.space/api/ingredients";

export function loadIngredients() {
  return fetch(ingredientsListUrl)
  .then(res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
              })
  .then(data => {
    if (data.success) return data.data;
  })
};

const orderDetailsUrl = "https://norma.nomoreparties.space/api/orders";

export function loadOrderDetails(newOrder) {
  return fetch(orderDetailsUrl, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data;
    })
}
