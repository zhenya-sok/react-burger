import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { loadIngredients } from '../../utils/api';
import { IngredientDataContext } from '../../services/ingredientDataContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelected] = useState([]);

  const ingredientsCategories = ingredients.reduce((all, current) => {
    const type = current.type
    if (!Array.isArray(all[type])) {
      all[type] = []
    }
    all[type].push(current)
    return all
  }, {})

  const appSelectedIngredient = (ingredient) => {
    if (selectedIngredients.some((item) => item.type === "bun") && ingredient.type === "bun") {
      return false;
    }
    setSelected((ingredientsArray) => [...ingredientsArray, ingredient]);
    return true;
  }
 
  const contextValue = {
    ingredients,
    selectedIngredients,
    appSelectedIngredient,
    ingredientsCategories,
  }

  useEffect(() => {
    loadIngredients()
      .then(setIngredients)
      .catch(err => {
        alert("Произошла ошибка при загрузке данных.")
      });
  }, [])

  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.mainWrapper}>
          <IngredientDataContext.Provider value={contextValue}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientDataContext.Provider>
        </main>
    </div>
  );
}

export default App;
