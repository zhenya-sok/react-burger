import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { constructorReducer } from './constructorReducer';
import { modalIngredientReducer } from './modalIngredientReducer';
import { orderReducer } from './orderDetailReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    constructorReducer: constructorReducer,
    modalIngredientReducer: modalIngredientReducer,
    orderReducer: orderReducer,
    authReducer: authReducer,
})
