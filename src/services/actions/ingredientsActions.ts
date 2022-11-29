import { loadIngredients } from '../../utils/api';
import { IIngredientData } from '../../types/types';
import {
    ADD_INGREDIENTS_REQUEST,
    ADD_INGREDIENTS_SUCCESS,
    ADD_INGREDIENTS_ERROR,
} from '../constants';

export interface IAddIngredientsRequestAction {
    readonly type: typeof ADD_INGREDIENTS_REQUEST;
}
export interface IAddIngredientsSuccessAction {
    readonly type: typeof ADD_INGREDIENTS_SUCCESS;
    readonly ingredients: IIngredientData[];
}
export interface IAddIngredientsErrorAction {
    readonly type: typeof ADD_INGREDIENTS_ERROR;
}


export type TIngredientsActions = 
    | IAddIngredientsRequestAction
    | IAddIngredientsSuccessAction
    | IAddIngredientsErrorAction;
    

export function addIngredients() {
    // @ts-ignore
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENTS_REQUEST
        });
        loadIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: ADD_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: ADD_INGREDIENTS_ERROR
                });
            }
        })
        .catch(err => dispatch({ type: ADD_INGREDIENTS_ERROR }))
    };
}
