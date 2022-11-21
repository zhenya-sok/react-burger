import {
    SELECT_INGREDIENT,
    UPDATE_CONSTRUCTOR_LIST,
}
    from '../actions/ingredientsActions';

const initialState = {
    selectedIngredients: [],
    currentItem: null,
}

export const constructorReducer = (state = initialState, action) => {
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
