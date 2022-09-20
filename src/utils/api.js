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