import { loadOrderDetails } from '../../utils/api';
import { IIngredientData } from '../../types/types';
import {
    SET_ORDER_DETAIL_REQUEST,
    SET_ORDER_DETAIL_SUCCESS,
    SET_ORDER_DETAIL_ERROR,
} from '../constants';

export interface ISetOrderDetailRequestAction {
    readonly type: typeof SET_ORDER_DETAIL_REQUEST;
}
export interface ISetOrderDetailSuccessAction {
    readonly type: typeof SET_ORDER_DETAIL_ERROR;
    readonly orderData: IIngredientData[];
}
export interface ISetOrderDetailErrorAction {
    readonly type: typeof SET_ORDER_DETAIL_ERROR;
}

export type TOrderDetailActions = 
    | ISetOrderDetailRequestAction
    | ISetOrderDetailSuccessAction
    | ISetOrderDetailErrorAction;


export function setOrderDetail(newOrder: IIngredientData[]) {
    // @ts-ignore
    return function (dispatch) {
        dispatch({
            type: SET_ORDER_DETAIL_REQUEST
        });
        // @ts-ignore
        loadOrderDetails(newOrder).then(res => {
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
        .catch(err => dispatch({ type: SET_ORDER_DETAIL_ERROR }))
    };
}
