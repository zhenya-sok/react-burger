import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer';
import { constructorReducer } from './constructorReducer';
import { modalIngredientReducer } from './modalIngredientReducer';
import { orderDetailReducer } from './orderDetailReducer';
import { authReducer } from './authReducer';
import { wsReducer } from './wsReducer';
import { wsProfileReducer } from './wsProfileReducer';

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    constructorReducer: constructorReducer,
    modalIngredientReducer: modalIngredientReducer,
    orderDetailReducer: orderDetailReducer,
    authReducer: authReducer,
    wsReducer: wsReducer,
    wsProfileReducer: wsProfileReducer,
})
