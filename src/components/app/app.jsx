import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredients, addSelectIngredient } from '../../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';

function App() {
  const dispatch = useDispatch();
  const ingredientsFromStore = useSelector((state) => state.ingredientsReducer.ingredients);
  const selectIngredientFromStore = useSelector((state) => state.constructorReducer.selectedIngredients);

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
      position: selectIngredientFromStore.length + 1,
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
        <BrowserRouter>
          <React.StrictMode>
            <Switch>
              <Route path="/" exact>
                <main className={styles.mainWrapper}>
                  <DndProvider backend={HTML5Backend}>
                    <IngredientDataContext.Provider value={contextValue}>
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </IngredientDataContext.Provider>
                  </DndProvider>
                </main>
              </Route>

              <Route path="/login" exact>
                <Login />
              </Route>

              <Route path="/register" exact>
                <Register />
              </Route>

              <Route path="/forgot-password" exact>
                <ForgotPassword />
              </Route>

              <Route path="/reset-password" exact>
                <ResetPassword />
              </Route>

            </Switch>
          </React.StrictMode>
        </BrowserRouter>


    </div>
  );
}

export default App;
