import {
    ORDERS_WS_CONNECTING,
    ORDERS_WS_OPEN,
    ORDERS_WS_CLOSE,
    ORDERS_WS_MESSAGE,
    ORDERS_WS_ERROR
} from '../../constants/index';
import { TWsOrdersActions } from '../../actions/wsAction';
import { IWsOrder, TConnectionError, WebsocketStatus } from '../../../types/wsTypes';

export type TWsOrdersState = {
    status: WebsocketStatus,
    connectionError: null | TConnectionError,
    orders: null | IWsOrder,
}

export const initialState: TWsOrdersState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: null,
    orders: null,
};

export const wsReducer = (state = initialState, action: TWsOrdersActions): TWsOrdersState => {
    switch (action.type) {
        case ORDERS_WS_CONNECTING: {
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        }

        case ORDERS_WS_OPEN: {
            return {
                ...state,
                status: WebsocketStatus.ONLINE
            };
        }
            
        case ORDERS_WS_CLOSE: {
            return {
                ...state,
                status: WebsocketStatus.OFFLINE
            };
        }
            
        case ORDERS_WS_ERROR: {
            return {
                ...state,
                connectionError: action.payload
            };
        }
            
        case ORDERS_WS_MESSAGE: {
            return {
                ...state,
                orders: action.payload
            };
        }  
    }

    return state
}
