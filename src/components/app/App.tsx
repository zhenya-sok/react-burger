import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { loadIngredients } from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    loadIngredients()
      .then(setIngredients)
      .catch(err => {
        alert("Произошла ошибка при загрузке данных.")
      });
  }, [])

  return (
    <div className={styles.app}>
      <div className="appWrapper">
        <AppHeader />
        <main className={styles.mainWrapper}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      </div>
    </div>
  );
}

export default App;
