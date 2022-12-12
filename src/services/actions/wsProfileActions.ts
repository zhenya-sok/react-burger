import { IWsOrder, TConnectionError } from '../../types/wsTypes';
import {
    PROFILE_ORDERS_CONNECT,
    PROFILE_ORDERS_DISCONNECT,
    PROFILE_ORDERS_WS_CONNECTING,
    PROFILE_ORDERS_WS_OPEN,
    PROFILE_ORDERS_WS_CLOSE,
    PROFILE_ORDERS_WS_ERROR,
    PROFILE_ORDERS_WS_MESSAGE
} from '../constants/index';

export interface IProfileOrdersConnectAction {
    readonly type: typeof PROFILE_ORDERS_CONNECT;
}
export interface IProfileOrdersDisconnectAction {
    readonly type: typeof PROFILE_ORDERS_DISCONNECT;
}
export interface IProfileOrdersWsConnectingAction {
    readonly type: typeof PROFILE_ORDERS_WS_CONNECTING;
}
export interface IProfileOrdersWsOpenAction {
    readonly type: typeof PROFILE_ORDERS_WS_OPEN;
}
export interface IProfileOrdersWsCloseAction {
    readonly type: typeof PROFILE_ORDERS_WS_CLOSE;
}
export interface IProfileOrdersWsMessageAction {
    readonly type: typeof PROFILE_ORDERS_WS_MESSAGE;
    readonly payload: IWsOrder;
}
export interface IProfileOrdersWsErrorAction {
    readonly type: typeof PROFILE_ORDERS_WS_ERROR;
    readonly payload: null | TConnectionError;
}

export type TWsProfileOrdersActions = 
    | IProfileOrdersConnectAction
    | IProfileOrdersDisconnectAction
    | IProfileOrdersWsConnectingAction
    | IProfileOrdersWsOpenAction
    | IProfileOrdersWsCloseAction
    | IProfileOrdersWsMessageAction
    | IProfileOrdersWsErrorAction;
