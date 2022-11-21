import {
    SET_CURRENT_ITEM,
}
    from '../actions/ingredientsActions';

const initialState = {
    currentItem: null,
}

export const modalIngredientReducer = (state = initialState, action) => {
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
