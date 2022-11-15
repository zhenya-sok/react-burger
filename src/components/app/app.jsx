import React, { useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredients, addSelectIngredient } from '../../services/actions/ingredientsActions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';
import { BrowserRouter, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import { checkAuthSession } from '../../services/actions/authActions';
import ProtectedRoute from '../protected-route/protected-route';
import PublicRoute from '../public-route/public-route';
import Modal from '../modal/modal';
import IngredientDetail from '../ingredient-details/ingredient-details';

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
    dispatch(addIngredients());
    dispatch(checkAuthSession());
  }, [dispatch])

  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;

    const handleModalClose = () => {
      history.goBack();
    };

    return (
      <div className={styles.app}>
        <AppHeader />
        <Switch location={background || location}>
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

          <PublicRoute path="/login" redirectTo="/" exact>
            <Login />
          </PublicRoute>

          <PublicRoute path="/register" redirectTo="/" exact>
            <Register />
          </PublicRoute>

          <PublicRoute path="/forgot-password" redirectTo="/" exact>
            <ForgotPassword />
          </PublicRoute>

          <PublicRoute path="/reset-password" redirectTo="/" exact>
            <ResetPassword />
          </PublicRoute>

          <ProtectedRoute path="/profile" redirectTo="/login">
            <Profile />
          </ProtectedRoute>

          <Route path="/ingredients/:id" exact>
            <div className="mt-30">
              <IngredientDetail />
            </div>
          </Route>
        </Switch>

        {background && (
          <Route path="/ingredients/:id" exact>
            <Modal titleText="Детали ингредиента" closeModal={handleModalClose}>
              <IngredientDetail />
            </Modal>
          </Route>
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <React.StrictMode>
        <ModalSwitch />
      </React.StrictMode>
    </BrowserRouter>
  )
}

export default App;
