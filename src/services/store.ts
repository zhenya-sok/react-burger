import { createStore, applyMiddleware, ActionCreator, Action } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TAuthActions } from './actions/authActions';
import { TConstructorActions } from './actions/constructorActions';
import { TIngredientsActions } from './actions/ingredientsActions';
import { TModalIngredientActions } from './actions/modalIngredientActions';
import { TOrderDetailActions } from './actions/orderDetailActions';
import { TWsOrdersActions } from './actions/wsAction';
import { TWsProfileOrdersActions } from './actions/wsProfileActions';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from '../services/middleware/socket-middleware';
import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_ERROR,

  PROFILE_ORDERS_CONNECT,
  PROFILE_ORDERS_DISCONNECT,
  PROFILE_ORDERS_WS_CONNECTING,
  PROFILE_ORDERS_WS_OPEN,
  PROFILE_ORDERS_WS_CLOSE,
  PROFILE_ORDERS_WS_ERROR,
  PROFILE_ORDERS_WS_MESSAGE
} from '../services/constants/index';

const wsActions = {
  connect: ORDERS_CONNECT,
  disconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  wsOpen: ORDERS_WS_OPEN,
  wsClose: ORDERS_WS_CLOSE,
  wsError: ORDERS_WS_ERROR,
  wsMessage: ORDERS_WS_MESSAGE
}

const profileOrdersWsActions = {
  connect: PROFILE_ORDERS_CONNECT,
  disconnect: PROFILE_ORDERS_DISCONNECT,
  wsConnecting: PROFILE_ORDERS_WS_CONNECTING,
  wsOpen: PROFILE_ORDERS_WS_OPEN,
  wsClose: PROFILE_ORDERS_WS_CLOSE,
  wsError: PROFILE_ORDERS_WS_ERROR,
  wsMessage: PROFILE_ORDERS_WS_MESSAGE
}


const websocketMiddleware = socketMiddleware(wsActions);
const profileOrdersWsMiddleware = socketMiddleware(profileOrdersWsActions);


export const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware( 
      thunk,
      websocketMiddleware,
      profileOrdersWsMiddleware
    )
  )
);

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = 
  | TAuthActions
  | TConstructorActions
  | TIngredientsActions
  | TModalIngredientActions
  | TOrderDetailActions
  | TWsOrdersActions
  | TWsProfileOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
