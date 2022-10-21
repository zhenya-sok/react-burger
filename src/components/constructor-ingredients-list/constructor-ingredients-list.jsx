import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Ingredient } from '../ingredient/ingredient';

const ConstructorIngredientsList = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);

    console.log(ingredients);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      // Получаем перетаскиваемый ингредиент
      const dragCard = ingredients[dragIndex];
      const newCards = [...ingredients]
      // Удаляем перетаскиваемый элемент из массива
      newCards.splice(dragIndex, 1)
      // Вставляем элемент на место того элемента,
      // над которым мы навели мышку с "перетаскиванием"
      // Тут просто создается новый массив, в котором изменен порядок наших элементов
      newCards.splice(hoverIndex, 0, dragCard)
      // В примере react-dnd используется библиотека immutability-helper
      // Которая позволяет описывать такую имутабельную логику более декларативно
      // Но для лучше понимания обновления массива,
      // Советую использовать стандартный splice
  
      dispatch({
        type: UPDATE_CONSTRUCTOR_LIST,
        paylod: newCards,
      })
    }, [ingredients, dispatch]);
  
    return (
      ingredients.map((item, index) => (
        <Ingredient key={item.dragId} index={index} item={item} moveCard={moveCard} />
      ))
    )
  }

export default ConstructorIngredientsList;