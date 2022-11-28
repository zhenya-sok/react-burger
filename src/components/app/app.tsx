import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { addIngredients, setCurrentItem } from '../../services/actions/ingredientsActions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import { checkAuthSession } from '../../services/actions/authActions';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetail from '../ingredient-details/ingredient-details';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import { Location } from 'history';

type TLocationState = {
  background: Location;
}

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(addIngredients());
    dispatch(checkAuthSession());
  }, [dispatch])

  const ModalSwitch = () => {
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
      history.goBack();
      dispatch(setCurrentItem(null));
    };

    return (
      <div className={styles.app}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact>
            <main className={styles.mainWrapper}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </Route>

          <ProtectedRoute path="/login" exact>
            <Login />
          </ProtectedRoute>

          <ProtectedRoute path="/register" exact>
            <Register />
          </ProtectedRoute>

          <ProtectedRoute path="/forgot-password" exact>
            <ForgotPassword />
          </ProtectedRoute>

          <ProtectedRoute path="/reset-password" exact>
            <ResetPassword />
          </ProtectedRoute>

          <ProtectedRoute path="/profile" onlyForAuth={true}>
            <Profile />
          </ProtectedRoute>

          <Route path="/ingredients/:id" exact>
            <div className="mt-30">
              <IngredientDetail />
            </div>
          </Route>
          
          <Route>
            <NotFound404 />
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
