import { IIngredientData } from '../../types/types';
import {
    SET_ORDER_DETAIL_REQUEST,
    SET_ORDER_DETAIL_SUCCESS,
    SET_ORDER_DETAIL_ERROR,
} from '../constants';
import { TOrderDetailActions } from '../actions/orderDetailActions'

type TOrderDetailState = {
    orderData: ReadonlyArray<IIngredientData>,
    orderDataRequest: boolean,
    orderDataError: boolean,
}

const initialState: TOrderDetailState = {
    orderData: [],
    orderDataRequest: false,
    orderDataError: false,
}


export const orderReducer = (state = initialState, action: TOrderDetailActions): TOrderDetailState => {
    switch (action.type) {
        case SET_ORDER_DETAIL_REQUEST: {
            return {
                ...state,
                orderDataRequest: true
            }
        }
        // @ts-ignore
        case SET_ORDER_DETAIL_SUCCESS: {
            return {
                ...state,
                orderDataError: false,
                // @ts-ignore
                orderData: action.orderData,
                orderDataRequest: false
            }
        }
        case SET_ORDER_DETAIL_ERROR: {
            return {
                ...state,
                orderData: [],
                orderDataError: true,
                orderDataRequest: false
            }
        }
    }

    return state
}
