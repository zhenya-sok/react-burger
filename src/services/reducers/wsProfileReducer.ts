import {
    PROFILE_ORDERS_WS_CONNECTING,
    PROFILE_ORDERS_WS_OPEN,
    PROFILE_ORDERS_WS_CLOSE,
    PROFILE_ORDERS_WS_MESSAGE,
    PROFILE_ORDERS_WS_ERROR
} from '../constants/index';
import { IWsOrder, TConnectionError, WebsocketStatus } from '../../types/wsTypes';
import { TWsProfileOrdersActions } from '../actions/wsProfileActions';

export type TWsProfileOrdersState = {
    status: WebsocketStatus,
    connectionError: null | TConnectionError,
    orders: null | IWsOrder,
}

const initialState: TWsProfileOrdersState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: null,
    orders: null,
};

export const wsProfileReducer = (state = initialState, action: TWsProfileOrdersActions): TWsProfileOrdersState => {
    switch (action.type) {
        case PROFILE_ORDERS_WS_CONNECTING: {
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        }

        case PROFILE_ORDERS_WS_OPEN: {
            return {
                ...state,
                status: WebsocketStatus.ONLINE
            };
        }
            
        case PROFILE_ORDERS_WS_CLOSE: {
            return {
                ...state,
                status: WebsocketStatus.OFFLINE
            };
        }
            
        case PROFILE_ORDERS_WS_ERROR: {
            return {
                ...state,
                connectionError: action.payload
            };
        }
            
        case PROFILE_ORDERS_WS_MESSAGE: {
            return {
                ...state,
                orders: action.payload
            };
        }  
    }

    return state
}
