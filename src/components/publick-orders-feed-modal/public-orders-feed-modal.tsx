import React, { FC, useEffect } from 'react';
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from '../../services/constants';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';
import OrderFeedItemDetails from '../order-feed-item-details/order-feed-item-details'

const PublicOrdersFeedModal: FC = () => {
    const dispatch = useDispatch();

    const ORDERS_SERVER_LIVE = "wss://norma.nomoreparties.space/orders/all";

    useEffect((): any => {
        dispatch({ type: ORDERS_CONNECT, payload: ORDERS_SERVER_LIVE });

        return () => dispatch({ type: ORDERS_DISCONNECT })
    }, [])

    const ordersData = useSelector((state) => state.wsReducer.orders);


    return (
        ordersData && <OrderFeedItemDetails ordersData={ordersData} />
    )
}

export default PublicOrdersFeedModal;
