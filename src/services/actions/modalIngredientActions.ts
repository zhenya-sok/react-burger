import { IIngredientData } from '../../types/types';
import {
    SET_CURRENT_ITEM,
} from '../constants';

export interface ISetCurentItemAction {
    readonly type: typeof SET_CURRENT_ITEM;
    readonly payload: IIngredientData | null;
}

export type TModalIngredientActions = ISetCurentItemAction;

export const setCurrentItem = (payload: IIngredientData | null): ISetCurentItemAction => {
    return {
        type: SET_CURRENT_ITEM,
        payload,
    }
}
