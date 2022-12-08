import { TOrderNumber } from '../../types/burgerTypes';
import { getOrderByNumber, loadOrderDetails } from '../../utils/api';
import {
    SET_ORDER_DETAIL_REQUEST,
    SET_ORDER_DETAIL_SUCCESS,
    SET_ORDER_DETAIL_ERROR,
} from '../constants';
import { AppDispatch } from '../store';

export interface ISetOrderDetailRequestAction {
    readonly type: typeof SET_ORDER_DETAIL_REQUEST;
}
export interface ISetOrderDetailSuccessAction {
    readonly type: typeof SET_ORDER_DETAIL_SUCCESS;
    readonly orderData: TOrderNumber;
}
export interface ISetOrderDetailErrorAction {
    readonly type: typeof SET_ORDER_DETAIL_ERROR;
}

export type TOrderDetailActions = 
    | ISetOrderDetailRequestAction
    | ISetOrderDetailSuccessAction
    | ISetOrderDetailErrorAction;


export function setOrderDetail(newOrder: object) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SET_ORDER_DETAIL_REQUEST
        });
        loadOrderDetails(newOrder)?.then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_ORDER_DETAIL_SUCCESS,
                    orderData: res
                });
            } else {
                dispatch({
                    type: SET_ORDER_DETAIL_ERROR
                });
            }
        })
        .catch((err) => dispatch({ type: SET_ORDER_DETAIL_ERROR }))
    };
}

export function getOrderInfoByNumber(orderNumber: number) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SET_ORDER_DETAIL_REQUEST
        });
        getOrderByNumber(orderNumber).then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_ORDER_DETAIL_SUCCESS,
                    orderData: res
                });
            } else {
                dispatch({
                    type: SET_ORDER_DETAIL_ERROR
                });
            }
        })
        .catch((err) => dispatch({ type: SET_ORDER_DETAIL_ERROR }))
    }
}
