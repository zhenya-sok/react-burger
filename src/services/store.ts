import { Dispatch } from 'react';
import { createStore, applyMiddleware, compose, ActionCreator, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { TAuthActions } from './actions/authActions';
import { TConstructorActions } from './actions/constructorActions';
import { TIngredientsActions } from './actions/ingredientsActions';
import { TModalIngredientActions } from './actions/modalIngredientActions';
import { TOrderDetailActions } from './actions/orderDetailActions';
import { rootReducer } from './reducers/rootReducer';

const composeEnhancers =
// @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // @ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions = 
  | TAuthActions
  | TConstructorActions
  | TIngredientsActions
  | TModalIngredientActions
  | TOrderDetailActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 
