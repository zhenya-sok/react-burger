import { testIngredientData } from '../../../utils/reducers-test-data';
import { SET_CURRENT_ITEM } from '../../constants';
import { initialState, modalIngredientReducer } from './modalIngredientReducer';

describe('modal-ingredient reducer', () => {
    it('should return the initial state', () => {
        expect(modalIngredientReducer(undefined, {})).toEqual(initialState)
    })

    it('SET_CURRENT_ITEM', () => {
        expect(
            modalIngredientReducer({...initialState, currentItem: []},
            {
                type: SET_CURRENT_ITEM,
                payload: testIngredientData
            })
        ).toEqual(
            {
                ...initialState,
                currentItem: testIngredientData
            }
        )
    });
})
