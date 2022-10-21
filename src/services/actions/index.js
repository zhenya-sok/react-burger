import { loadIngredients, loadOrderDetails } from '../../utils/api';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_INGREDIENTS_REQUEST = 'ADD_INGREDIENTS_REQUEST';
export const ADD_INGREDIENTS_SUCCESS = 'ADD_INGREDIENTS_SUCCESS';
export const ADD_INGREDIENTS_ERROR = 'ADD_INGREDIENTS_ERROR';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';

export const SET_ORDER_DETAIL = 'SET_ORDER_DETAIL';
export const SET_ORDER_DETAIL_REQUEST = 'SET_ORDER_DETAIL_REQUEST';
export const SET_ORDER_DETAIL_SUCCESS = 'SET_ORDER_DETAIL_SUCCESS';
export const SET_ORDER_DETAIL_ERROR = 'SET_ORDER_DETAIL_ERROR';

export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST';

export function addIngredients() {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENTS_REQUEST
        });
        loadIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: ADD_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: ADD_INGREDIENTS_ERROR
                });
            }
        })
        .catch(err => dispatch({ type: ADD_INGREDIENTS_ERROR }))
    };
}

// export const addIngredients = (payload) => {
//     return {
//         type: ADD_INGREDIENTS,
//         payload,
//     }
// }

export const addSelectIngredient = (payload) => {
    return {
        type: SELECT_INGREDIENT,
        payload,
    }
}

export const setCurrentItem = (payload) => {
    return {
        type: SET_CURRENT_ITEM,
        payload,
    }
}

// export const setOrderDetail = (payload) => {
//     return {
//         type: SET_ORDER_DETAIL,
//         payload,
//     }
// }

export function setOrderDetail(newOrder) {
    return function (dispatch) {
        dispatch({
            type: SET_ORDER_DETAIL_REQUEST
        });
        loadOrderDetails(newOrder).then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_ORDER_DETAIL_SUCCESS,
                    orderData: res
                });
            } else {
                dispatch({
                    type: SET_ORDER_DETAIL_ERROR
                });
            }
        });
    };
}