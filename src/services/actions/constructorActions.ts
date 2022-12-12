import { IIngredientData } from '../../types/burgerTypes';
import {
    SELECT_INGREDIENT,
    UPDATE_CONSTRUCTOR_LIST
} from '../constants';

export interface ISelectIngredientAction {
    readonly type: typeof SELECT_INGREDIENT;
    readonly payload: IIngredientData[];
}

export interface IUpdateConstructorListAction {
    readonly type: typeof UPDATE_CONSTRUCTOR_LIST;
    readonly payload: IIngredientData[];
}

export type TConstructorActions = 
    | ISelectIngredientAction
    | IUpdateConstructorListAction;


export const addSelectIngredient = (payload: IIngredientData[]): ISelectIngredientAction => {
    return {
        type: SELECT_INGREDIENT,
        payload,
    }
}

export const updateIngredientsList = (payload: IIngredientData[]): IUpdateConstructorListAction => {
    return {
        type: UPDATE_CONSTRUCTOR_LIST,
        payload
    }
}
