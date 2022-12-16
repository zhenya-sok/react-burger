import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import { useDispatch } from '../../utils/hooks/hooks';
import { setCurrentItem } from '../../services/actions/modalIngredientActions';
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
import { addIngredients } from '../../services/actions/ingredientsActions';
import PublicOrdersFeedModal from '../publick-orders-feed-modal/public-orders-feed-modal';
import PersonalOrdersFeedModal from '../personal-orders-feed-modal/personal-orders-feed-modal';

type TLocationState = {
  background: Location;
}

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
              <PublicOrdersFeedModal />
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
            <Modal closeModal={handleModalClose}>
              <PublicOrdersFeedModal />
            </Modal>
          </Route>
        )}

        {background && (
          <Route path="/profile/orders/:id" exact>
            <Modal closeModal={handleModalClose}>
              <PersonalOrdersFeedModal />
            </Modal>
          </Route>
        )}
      </div>
    );
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ModalSwitch />
    </BrowserRouter>
  )
}

export default App;
