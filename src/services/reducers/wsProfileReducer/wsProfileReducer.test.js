import { WebsocketStatus } from '../../../types/wsTypes';
import { testWsOrder } from '../../../utils/reducers-test-data';
import { PROFILE_ORDERS_WS_CLOSE, PROFILE_ORDERS_WS_CONNECTING, PROFILE_ORDERS_WS_ERROR, PROFILE_ORDERS_WS_MESSAGE, PROFILE_ORDERS_WS_OPEN } from '../../constants';
import { initialState, wsProfileReducer } from './wsProfileReducer';

describe('ws-profile-reducer', () => {
    it('should return the initial state', () => {
        expect(wsProfileReducer(undefined, {})).toEqual(initialState)
    })

    it('PROFILE_ORDERS_WS_CONNECTING', () => {
        expect(
            wsProfileReducer({...initialState, status: WebsocketStatus.OFFLINE}, 
            {
                type: PROFILE_ORDERS_WS_CONNECTING,
            })
        ).toEqual(
            {
                ...initialState,
                status: WebsocketStatus.CONNECTING
            }
        )
    });

    it('PROFILE_ORDERS_WS_OPEN', () => {
        expect(
            wsProfileReducer({...initialState, status: WebsocketStatus.OFFLINE},
            {
                type: PROFILE_ORDERS_WS_OPEN,
            })
        ).toEqual(
            {
                ...initialState,
                status: WebsocketStatus.ONLINE
            }
        )
    });

    it('PROFILE_ORDERS_WS_CLOSE', () => {
        expect(
            wsProfileReducer({...initialState, status: WebsocketStatus.ONLINE},
            {
                type: PROFILE_ORDERS_WS_CLOSE,
            })
        ).toEqual(
            {
                ...initialState,
                status: WebsocketStatus.OFFLINE
            }
        )
    });

    it('PROFILE_ORDERS_WS_ERROR', () => {
        expect(
            wsProfileReducer({...initialState, connectionError: null},
            {
                type: PROFILE_ORDERS_WS_ERROR,
                payload: 'error'
            })
        ).toEqual(
            {
                ...initialState,
                connectionError: 'error'
            }
        )
    });

    it('PROFILE_ORDERS_WS_MESSAGE', () => {
        expect(
            wsProfileReducer({...initialState, orders: null},
            {
                type: PROFILE_ORDERS_WS_MESSAGE,
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
