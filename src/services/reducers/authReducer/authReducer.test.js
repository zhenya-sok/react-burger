import { initialState, authReducer } from './authReducer';
import { REGISTER_USER_REQUEST, CHECK_AUTH_SESSION, GET_USER, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, UPDATE_USER } from '../../constants';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    it('REGISTER_USER_REQUEST', () => {
        expect(
            authReducer({...initialState, registerRequest: false, registerError: true}, {
                type: REGISTER_USER_REQUEST
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
            authReducer(
            {...initialState,
                registerError: true,
                user: undefined,
                registerRequest: true,
                token: undefined
            },
            {
                type: REGISTER_USER_SUCCESS,
                payload: {
                    accessToken: 'testAccessToken'
                }
            })
        ).toEqual(
            {
                ...initialState,
                registerError: false,
                user: {
                  accessToken: 'testAccessToken'
                },
                registerRequest: false,
                token: 'testAccessToken'
            }
        )
    });

    it('REGISTER_USER_ERROR', () => {
        expect(
            authReducer({...initialState, registerRequest: true, registerError: false}, {
                type: REGISTER_USER_ERROR,
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
            authReducer({...initialState, loginRequest: false, loginError: true}, {
                type: LOGIN_REQUEST,
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
            authReducer({
                ...initialState,
                loginError: true,
                user: undefined,
                accessToken: undefined,
                loginRequest: true,
            },
            {
                type: LOGIN_SUCCESS,
                payload: {
                    accessToken: 'testAccessToken',
                    user: {
                        email: "email",
                        name: "name"
                    },
                },
            })
        ).toEqual(
            {
                ...initialState,
                loginError: false,
                user: {
                    email: "email",
                    name: "name"
                },
                token: 'testAccessToken',
                loginRequest: false,
            }
        )
    });

    it('LOGIN_ERROR', () => {
        expect(
            authReducer({...initialState, loginError: false, loginRequest: true}, {
                type: LOGIN_ERROR,
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
            authReducer({...initialState, token: undefined}, {
                type: CHECK_AUTH_SESSION,
                payload: {
                    accessToken: 'testAccessToken'
                }
            })
        ).toEqual(
            {
                ...initialState,
                token: {
                    accessToken: 'testAccessToken'
                }
            }
        )
    });

    it('LOGOUT', () => {
        expect(
            authReducer(
            {
                ...initialState, 
                user: {
                    email: "email",
                    name: "name"
                },
                token: 'testAccessToken',
            }, 
            {
                type: LOGOUT,
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
            authReducer({...initialState, user: undefined}, {
                type: GET_USER,
                payload: {
                    email: "email",
                    name: "name"
                }
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    email: "email",
                    name: "name"
                }
            }
        )
    });

    it('UPDATE_USER', () => {
        expect(
            authReducer({...initialState, user: undefined}, {
                type: UPDATE_USER,
                payload: {
                    email: "email",
                    name: "name"
                }
            })
        ).toEqual(
            {
                ...initialState,
                user: {
                    email: "email",
                    name: "name"
                }
            }
        )
    });
});
