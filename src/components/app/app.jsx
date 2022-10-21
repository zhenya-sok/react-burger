import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { loadIngredients } from '../../utils/api';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredients, addSelectIngredient } from '../../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';


function App() {
  const dispatch = useDispatch();
  const ingredientsFromStore = useSelector((state) => state.ingredientsReducer.ingredients);
  const selectIngredientFromStore = useSelector((state) => state.ingredientsReducer.selectedIngredients);

  const ingredientsCategories = ingredientsFromStore.reduce((all, current) => {
    const type = current.type
    if (!Array.isArray(all[type])) {
      all[type] = []
    }
    all[type].push(current)
    return all
  }, {})

  const appSelectedIngredient = (ingredientRaw) => {
    const ingredient = {
      ...ingredientRaw,
      dragId: uuid()
    }

    const bunIndex = selectIngredientFromStore.findIndex((item) => item.type === "bun");

    if (ingredient.type === "bun" && bunIndex !== -1) {
      const newSelectedIngredients = [...selectIngredientFromStore];
      newSelectedIngredients.splice(bunIndex, 1, ingredient);
      dispatch(addSelectIngredient(newSelectedIngredients));
      return
    }

    dispatch(addSelectIngredient([...selectIngredientFromStore, ingredient]))
    return true;
  }
 
  const contextValue = {
    ingredients: ingredientsFromStore,
    selectedIngredients: selectIngredientFromStore,
    appSelectedIngredient,
    ingredientsCategories,
  }

  useEffect(() => {
    dispatch(addIngredients())
  }, [dispatch])

  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.mainWrapper}>
          <DndProvider backend={HTML5Backend}>
            <IngredientDataContext.Provider value={contextValue}>
              <BurgerIngredients />
              <BurgerConstructor />
            </IngredientDataContext.Provider>
          </DndProvider>
        </main>
    </div>
  );
}

export default App;
