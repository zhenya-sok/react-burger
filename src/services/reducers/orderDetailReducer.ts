import { TOrderNumber } from '../../types/burgerTypes';
import {
    SET_ORDER_DETAIL_REQUEST,
    SET_ORDER_DETAIL_SUCCESS,
    SET_ORDER_DETAIL_ERROR,
} from '../constants';
import { TOrderDetailActions } from '../actions/orderDetailActions'

export type TOrderDetailState = {
    orderData: undefined | TOrderNumber,
    orderDataRequest: boolean,
    orderDataError: boolean,
}

const initialState: TOrderDetailState = {
    orderData: undefined,
    orderDataRequest: false,
    orderDataError: false,
}


export const orderDetailReducer = (state = initialState, action: TOrderDetailActions): TOrderDetailState => {
    switch (action.type) {
        case SET_ORDER_DETAIL_REQUEST: {
            return {
                ...state,
                orderDataRequest: true
            }
        }
        case SET_ORDER_DETAIL_SUCCESS: {
            return {
                ...state,
                orderDataError: false,
                orderData: action.orderData,
                orderDataRequest: false
            }
        }
        case SET_ORDER_DETAIL_ERROR: {
            return {
                ...state,
                orderData: undefined,
                orderDataError: true,
                orderDataRequest: false
            }
        }
    }

    return state
}
