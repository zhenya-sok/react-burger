import { WebsocketStatus } from '../../../types/wsTypes';
import { testWsOrder } from '../../../utils/reducers-test-data';
import { ORDERS_WS_CLOSE, ORDERS_WS_CONNECTING, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN } from '../../constants';
import { initialState, wsReducer } from './wsReducer';

describe('ws-reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    it('ORDERS_WS_CONNECTING', () => {
        expect(
            wsReducer({...initialState, status: WebsocketStatus.OFFLINE}, 
            {
                type: ORDERS_WS_CONNECTING,
            })
        ).toEqual(
            {
                ...initialState,
                status: WebsocketStatus.CONNECTING
            }
        )
    });

    it('ORDERS_WS_OPEN', () => {
        expect(
            wsReducer({...initialState, status: WebsocketStatus.OFFLINE},
            {
                type: ORDERS_WS_OPEN,
            })
        ).toEqual(
            {
                ...initialState,
                status: WebsocketStatus.ONLINE
            }
        )
    });

    it('ORDERS_WS_CLOSE', () => {
        expect(
            wsReducer({...initialState, status: WebsocketStatus.ONLINE},
            {
                type: ORDERS_WS_CLOSE,
            })
        ).toEqual(
            {
                ...initialState,
                status: WebsocketStatus.OFFLINE
            }
        )
    });

    it('ORDERS_WS_ERROR', () => {
        expect(
            wsReducer({...initialState, connectionError: null},
            {
                type: ORDERS_WS_ERROR,
                payload: 'error'
            })
        ).toEqual(
            {
                ...initialState,
                connectionError: 'error'
            }
        )
    });

    it('ORDERS_WS_MESSAGE', () => {
        expect(
            wsReducer({...initialState, orders: null},
            {
                type: ORDERS_WS_MESSAGE,
                payload: testWsOrder
            })
        ).toEqual(
            {
                ...initialState,
                orders: testWsOrder
            }
        )
    });
})
