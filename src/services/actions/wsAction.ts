import { IWsOrder } from '../../types/wsTypes';
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
    readonly payload: {
        orders: IWsOrder[];
    }
}
export interface IOrdersWsErrorAction {
    readonly type: typeof ORDERS_WS_ERROR;
    readonly payload: {
        connectionError: string;
    }
}

export type TWsOrdersActions = 
    | IOrdersConnectAction
    | IOrdersDisconnectAction
    | IOrdersWsConnectingAction
    | IOrdersWsOpenAction
    | IOrdersWsCloseAction
    | IOrdersWsMessageAction
    | IOrdersWsErrorAction;


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
    readonly payload: {
        orders: IWsOrder[];
    }
}
export interface IProfileOrdersWsErrorAction {
    readonly type: typeof PROFILE_ORDERS_WS_ERROR;
    readonly payload: {
        connectionError: string;
    }
}

export type TWsProfileOrdersActions = 
    | IProfileOrdersConnectAction
    | IProfileOrdersDisconnectAction
    | IProfileOrdersWsConnectingAction
    | IProfileOrdersWsOpenAction
    | IProfileOrdersWsCloseAction
    | IProfileOrdersWsMessageAction
    | IProfileOrdersWsErrorAction;
    