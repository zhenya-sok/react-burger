import { IIngredientData } from '../../types/burgerTypes';
import {
    SET_CURRENT_ITEM,
} from '../constants';
import { TModalIngredientActions } from '../actions/modalIngredientActions';

type TModalIngredientState = {
    currentItem: IIngredientData | null,
}

const initialState: TModalIngredientState = {
    currentItem: null,
}

export const modalIngredientReducer = (state = initialState, action: TModalIngredientActions): TModalIngredientState => {
    switch (action.type) {
        case SET_CURRENT_ITEM: {
            return {
                ...state,
                currentItem: action.payload
            }
        }
    }

    return state
}
