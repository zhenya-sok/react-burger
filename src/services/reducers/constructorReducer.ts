import { IIngredientData } from '../../types/types';
import {
    SELECT_INGREDIENT,
    UPDATE_CONSTRUCTOR_LIST,
} from '../constants';
import { TConstructorActions } from '../actions/constructorActions';

type TConstructorState = {
    selectedIngredients: ReadonlyArray<IIngredientData>,
}

const initialState: TConstructorState = {
    selectedIngredients: [],
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch (action.type) {
        case SELECT_INGREDIENT: {
            return {
                ...state,
                selectedIngredients: action.payload
            }
        }
       
        case UPDATE_CONSTRUCTOR_LIST: {
            return {
                ...state,
                selectedIngredients: action.payload
            }
        }
    }

    return state
}
