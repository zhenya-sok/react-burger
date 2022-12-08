import { Middleware } from 'redux';
import { IOrderItem } from '../../types/wsTypes';
import { RootState } from '../store';

export type TWsActions = {
    connect: string,
    disconnect: string,
    wsConnecting: string,
    wsOpen: string,
    wsClose: string,
    wsError: string,
    wsMessage: IOrderItem[]
}

export const socketMiddleware: any = (wsActions: TWsActions): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = "";
        let isConnected = false;
;        let reconnectTimer = 0;
        
        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;

            const { 
                connect, disconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage 
            } = wsActions;

            if (type === connect) {
                console.log("Websocket connect");
                
                url = payload;
                socket = new WebSocket(url);
                window.clearTimeout(reconnectTimer);
                isConnected = true;
                dispatch({ type: wsConnecting });
            }

            if (socket) {    
                socket.onopen = () => {
                    dispatch({ type: wsOpen })
                }
                
                socket.onerror = () => {
                    dispatch({ type: wsError, payload: "Websocket error" })
                }
                
                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsMessage, payload: parsedData });            
                }

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        console.log("error");
                        dispatch({ type: wsError, payload: event.code.toString() })
                    }

                    if (isConnected) {
                        dispatch({ type: wsConnecting });
                        reconnectTimer = window.setTimeout(() => {
                            dispatch({ type: connect, payload: url});
                        }, 3000)
                    }
                }

                if (type === disconnect) {
                    console.log("Websocket DISconnect");
                    window.clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    dispatch({ type: wsClose });
                    socket.close();
                    
                }

            }

            next(action)
        }
    }
}
