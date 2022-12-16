import { IWsOrder, TConnectionError } from '../../types/wsTypes';
import {
    ORDERS_CONNECT,
    ORDERS_DISCONNECT,
    ORDERS_WS_CONNECTING,
    ORDERS_WS_OPEN,
    ORDERS_WS_CLOSE,
    ORDERS_WS_MESSAGE,
    ORDERS_WS_ERROR,
} from '../constants/index';

export interface IOrdersConnectAction {
    readonly type: typeof ORDERS_CONNECT;
}
export interface IOrdersDisconnectAction {
    readonly type: typeof ORDERS_DISCONNECT;
}
export interface IOrdersWsConnectingAction {
    readonly type: typeof ORDERS_WS_CONNECTING;
}
export interface IOrdersWsOpenAction {
    readonly type: typeof ORDERS_WS_OPEN;
}
export interface IOrdersWsCloseAction {
    readonly type: typeof ORDERS_WS_CLOSE;
}
export interface IOrdersWsMessageAction {
    readonly type: typeof ORDERS_WS_MESSAGE;
    readonly payload: IWsOrder;
}
export interface IOrdersWsErrorAction {
    readonly type: typeof ORDERS_WS_ERROR;
    readonly payload: null | TConnectionError;
}

export type TWsOrdersActions = 
    | IOrdersConnectAction
    | IOrdersDisconnectAction
    | IOrdersWsConnectingAction
    | IOrdersWsOpenAction
    | IOrdersWsCloseAction
    | IOrdersWsMessageAction
    | IOrdersWsErrorAction;
