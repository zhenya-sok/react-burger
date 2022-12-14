import { testIngredientData } from '../../../utils/reducers-test-data';
import { SELECT_INGREDIENT } from '../../constants';
import { constructorReducer, initialState } from './constructorReducer';

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('SELECT_INGREDIENT', () => {
        expect(
            constructorReducer({...initialState, selectedIngredients: []}, 
            {
                type: SELECT_INGREDIENT,
                payload: testIngredientData
            })
        ).toEqual(
            {
                ...initialState,
                selectedIngredients: testIngredientData
            }
        )
    });

    it('UPDATE_CONSTRUCTOR_LIST', () => {
        expect(
            constructorReducer({...initialState, selectedIngredients: []}, 
            {
                type: SELECT_INGREDIENT,
                payload: testIngredientData
            })
        ).toEqual(
            {
                ...initialState,
                selectedIngredients: testIngredientData
            }
        )
    });
})
