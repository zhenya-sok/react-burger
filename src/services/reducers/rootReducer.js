import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { constructorReducer } from './constructorReducer';
import { modalIngredientReducer } from './modalIngredientReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    constructorReducer: constructorReducer,
    modalIngredientReducer: modalIngredientReducer,
    orderReducer: orderReducer,
})
