export interface IOrderItem {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export interface IWsOrder {
    success: boolean;
    orders: IOrderItem[];
    total: number;
    totalToday: number;
}

export enum WebsocketStatus {
    CONNECTING = "CONNECTING...",
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

export type TConnectionError = {
    connectionError: null | string;
}
