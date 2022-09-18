const ingredientsListUrl = "https://norma.nomoreparties.space/api/ingredients";

export function loadIngredients() {
  return fetch(ingredientsListUrl)
  .then(res => res.json())
  .then(data => {
    if (data.success) return data.data;
  })
};
