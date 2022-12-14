import { testIngredientData } from '../../../utils/reducers-test-data';
import { ADD_INGREDIENTS_ERROR, ADD_INGREDIENTS_REQUEST, ADD_INGREDIENTS_SUCCESS } from '../../constants';
import { ingredientsReducer, initialState } from './ingredientsReducer';

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('ADD_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer({...initialState, ingredientsRequest: false}, 
            {
                type: ADD_INGREDIENTS_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                ingredientsRequest: true,
            }
        )
    });

    it('ADD_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(
            {...initialState,
                ingredientsError: true,
                ingredients: [],
                ingredientsRequest: true
            },
            {
                type: ADD_INGREDIENTS_SUCCESS,
                ingredients: testIngredientData
            })
        ).toEqual(
            {
                ...initialState,
                ingredientsError: false,
                ingredients: testIngredientData,
                ingredientsRequest: false
            }
        )
    });

    it('ADD_INGREDIENTS_ERROR', () => {
        expect(
            ingredientsReducer(
            {...initialState,
                ingredientsError: false,
                ingredientsRequest: true
            },
            {
                type: ADD_INGREDIENTS_ERROR,
            })
        ).toEqual(
            {
                ...initialState,
                ingredientsError: true,
                ingredientsRequest: false
            }
        )
    });
})
