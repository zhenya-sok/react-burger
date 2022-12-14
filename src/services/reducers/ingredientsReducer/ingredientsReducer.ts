import { IIngredientData } from '../../../types/burgerTypes';
import {
    ADD_INGREDIENTS_REQUEST,
    ADD_INGREDIENTS_SUCCESS,
    ADD_INGREDIENTS_ERROR,
} from '../../constants';
import { TIngredientsActions } from '../../actions/ingredientsActions';

type TIngredientsState = {
    ingredients: IIngredientData[];
    ingredientsRequest: boolean;
    ingredientsError: boolean;
};
  

export const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case ADD_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            }
        }
        case ADD_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsError: false,
                ingredients: action.ingredients,
                ingredientsRequest: false
            }
        }
        case ADD_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsError: true,
                ingredientsRequest: false
            }
        }
    }

    return state
}
