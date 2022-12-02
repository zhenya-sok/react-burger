import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import { useDispatch } from 'react-redux';
import { addIngredients, setCurrentItem } from '../../services/actions/ingredientsActions';
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
import OrderFeed from '../../pages/order-feed/order-feed';
import MainPage from '../../pages/main-page/main-page';
import OrderFeedItemDetail from '../order-feed-item-details/order-feed-item-details';

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
            <MainPage />
          </Route>

          <Route path="/feed" exact>
            <OrderFeed />
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

          <Route path="/feed/:id" exact>
            <div className="mt-30">
              <OrderFeedItemDetail />
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

        {background && (
          <Route path="/feed/:id" exact>
            <Modal titleText="#12345" closeModal={handleModalClose}>
              <OrderFeedItemDetail />
            </Modal>
          </Route>
        )}

        {background && (
          <Route path="/profile/orders/:id" exact>
            <Modal titleText="#12345" closeModal={handleModalClose}>
              <OrderFeedItemDetail />
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
