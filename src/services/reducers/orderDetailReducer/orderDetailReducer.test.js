import { testOrderNumber } from '../../../utils/reducers-test-data';
import { SET_ORDER_DETAIL_ERROR, SET_ORDER_DETAIL_REQUEST, SET_ORDER_DETAIL_SUCCESS } from '../../constants';
import { initialState, orderDetailReducer } from './orderDetailReducer';

describe('order-detail reducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailReducer(undefined, {})).toEqual(initialState)
    })

    it('SET_ORDER_DETAIL_REQUEST', () => {
        expect(
            orderDetailReducer(
            {...initialState,
                orderDataRequest: false,
                orderData: undefined,
                preloader: false,
            }, 
            {
                type: SET_ORDER_DETAIL_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                orderDataRequest: true,
                orderData: undefined,
                preloader: true,
            }
        )
    });

    it('SET_ORDER_DETAIL_SUCCESS', () => {
        expect(
            orderDetailReducer(
            {...initialState,
                orderDataError: true,
                orderData: undefined,
                orderDataRequest: true,
                preloader: true,
            },
            {
                type: SET_ORDER_DETAIL_SUCCESS,
                orderData: testOrderNumber
            })
        ).toEqual(
            {
                ...initialState,
                orderDataError: false,
                orderData: testOrderNumber,
                orderDataRequest: false,
                preloader: false,
            }
        )
    });

    it('SET_ORDER_DETAIL_ERROR', () => {
        expect(
            orderDetailReducer(
            {...initialState,
                orderData: testOrderNumber,
                orderDataError: false,
                orderDataRequest: true
            },
            {
                type: SET_ORDER_DETAIL_ERROR,
            })
        ).toEqual(
            {
                ...initialState,
                orderData: undefined,
                orderDataError: true,
                orderDataRequest: false
            }
        )
    });
})
