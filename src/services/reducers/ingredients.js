import { combineReducers } from 'redux';
import { 
        ADD_INGREDIENTS,
        ADD_INGREDIENTS_REQUEST,
        ADD_INGREDIENTS_SUCCESS,
        ADD_INGREDIENTS_ERROR,

        SELECT_INGREDIENT, 
        SET_CURRENT_ITEM,

        SET_ORDER_DETAIL,
        SET_ORDER_DETAIL_REQUEST,
        SET_ORDER_DETAIL_SUCCESS,
        SET_ORDER_DETAIL_ERROR,

        UPDATE_CONSTRUCTOR_LIST,
       } 
from '../actions';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,

    selectedIngredients: [],
    currentItem: null,

    orderData: [],
    orderDataRequest: false,
    orderDataError: false,
}

const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
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
        // case ADD_INGREDIENTS: {
        //     return { 
        //         ...state,
        //         ingredients: action.payload
        //     }
        // }

        case SELECT_INGREDIENT: {
            return {
                ...state,
                selectedIngredients: action.payload
            }
        }
        case SET_CURRENT_ITEM: {
            return {
                ...state,
                currentItem: action.payload
            }
        }

        // case SET_ORDER_DETAIL: {
        //     return {
        //         ...state,
        //         orderData: action.payload
        //     }
        // }
        case SET_ORDER_DETAIL_REQUEST: {
            return {
                ...state,
                orderDataRequest: true
            }
        }
        case SET_ORDER_DETAIL_SUCCESS: {
            return {
                ...state, 
                orderDataError: false, 
                orderData: action.orderData, 
                orderDataRequest: false
            }
        }
        case SET_ORDER_DETAIL_ERROR: {
            return {
                ...state, 
                orderDataError: true, 
                orderDataRequest: false
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

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
})
