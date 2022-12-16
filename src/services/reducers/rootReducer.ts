import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer/ingredientsReducer';
import { constructorReducer } from './constructorReducer/constructorReducer';
import { modalIngredientReducer } from './modalIngredientReducer/modalIngredientReducer';
import { orderDetailReducer } from './orderDetailReducer/orderDetailReducer';
import { authReducer } from './authReducer/authReducer';
import { wsReducer } from './wsReducer/wsReducer';
import { wsProfileReducer } from './wsProfileReducer/wsProfileReducer';

export const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    constructorReducer: constructorReducer,
    modalIngredientReducer: modalIngredientReducer,
    orderDetailReducer: orderDetailReducer,
    authReducer: authReducer,
    wsReducer: wsReducer,
    wsProfileReducer: wsProfileReducer,
})
