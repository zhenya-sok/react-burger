import { initialState, authReducer } from './authReducer';
import { REGISTER_USER_REQUEST } from '../../actions/authActions';
import { CHECK_AUTH_SESSION, GET_USER, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, UPDATE_USER } from '../../constants';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    it('REGISTER_USER_REQUEST', () => {
        expect(
            authReducer(undefined, {
                type: REGISTER_USER_REQUEST,
                registerRequest: true,
                registerError: false,
            })
        ).toEqual(
            {
                ...initialState,
                registerRequest: true,
                registerError: false,
            }
        )
    });

    it('REGISTER_USER_SUCCESS', () => {
        expect(
            authReducer(undefined, {
                type: REGISTER_USER_SUCCESS,
                registerError: false,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
                registerRequest: false,
                token: { type: REGISTER_USER_SUCCESS, payload: { accessToken: ['testAccessToken'] } },
            })
        ).toEqual(
            {
                ...initialState,
                registerError: false,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
                registerRequest: false,
                token: { type: REGISTER_USER_SUCCESS, payload: { accessToken: ['testAccessToken'] } },
            }
        )
    });

    it('REGISTER_USER_ERROR', () => {
        expect(
            authReducer(undefined, {
                type: REGISTER_USER_ERROR,
                registerError: true,
                registerRequest: false,
            })
        ).toEqual(
            {
                ...initialState,
                registerError: true,
                registerRequest: false,
            }
        )
    });

    it('LOGIN_REQUEST', () => {
        expect(
            authReducer(undefined, {
                type: LOGIN_REQUEST,
                loginRequest: true,
                loginError: false,
            })
        ).toEqual(
            {
                ...initialState,
                loginRequest: true,
                loginError: false,
            }
        )
    });

    it('LOGIN_SUCCESS', () => {
        expect(
            authReducer(undefined, {
                type: LOGIN_SUCCESS,
                loginError: false,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
                token: { type: REGISTER_USER_SUCCESS, payload: { accessToken: ['testAccessToken'] } },
                loginRequest: false,
            })
        ).toEqual(
            {
                ...initialState,
                loginError: false,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
                token: { type: REGISTER_USER_SUCCESS, payload: { accessToken: ['testAccessToken'] } },
                loginRequest: false,
            }
        )
    });

    it('LOGIN_ERROR', () => {
        expect(
            authReducer(undefined, {
                type: LOGIN_ERROR,
                loginError: true,
                loginRequest: false
            })
        ).toEqual(
            {
                ...initialState,
                loginError: true,
                loginRequest: false
            }
        )
    });

    it('CHECK_AUTH_SESSION', () => {
        expect(
            authReducer(undefined, {
                type: CHECK_AUTH_SESSION,
                token: { type: REGISTER_USER_SUCCESS, payload: { accessToken: ['testAccessToken'] } },
            })
        ).toEqual(
            {
                ...initialState,
                token: { type: REGISTER_USER_SUCCESS, payload: { accessToken: ['testAccessToken'] } },
            }
        )
    });

    it('LOGOUT', () => {
        expect(
            authReducer(undefined, {
                type: LOGOUT,
                user: undefined,
                token: undefined,
            })
        ).toEqual(
            {
                ...initialState,
                user: undefined,
                token: undefined,
            }
        )
    });

    it('GET_USER', () => {
        expect(
            authReducer(undefined, {
                type: GET_USER,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
            })
        ).toEqual(
            {
                ...initialState,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
            }
        )
    });

    it('UPDATE_USER', () => {
        expect(
            authReducer(undefined, {
                type: UPDATE_USER,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
            })
        ).toEqual(
            {
                ...initialState,
                user: { type: REGISTER_USER_SUCCESS, payload: { res: ['testUser'] } },
            }
        )
    });
});
