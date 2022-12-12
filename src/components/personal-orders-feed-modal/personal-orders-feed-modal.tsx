import Cookies from 'js-cookie';
import React, { FC, useEffect } from 'react';
import { PROFILE_ORDERS_CONNECT, PROFILE_ORDERS_DISCONNECT } from '../../services/constants';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';
import OrderFeedItemDetails from '../order-feed-item-details/order-feed-item-details'

const PersonalOrdersFeedModal: FC = () => {
    const dispatch = useDispatch();

    const accessToken = Cookies.get("accessToken");
    const token = accessToken?.replace("Bearer ","");
    const PROFILE_ORDERS_SERVER_LIVE = `wss://norma.nomoreparties.space/orders?token=${token}`;


    useEffect((): any => {
        dispatch({ type: PROFILE_ORDERS_CONNECT, payload: PROFILE_ORDERS_SERVER_LIVE });

        return () => dispatch({ type: PROFILE_ORDERS_DISCONNECT })
    }, [])

    const ordersData = useSelector((state) => state.wsProfileReducer.orders);

    return (
        ordersData && <OrderFeedItemDetails ordersData={ordersData} />
    )
}

export default PersonalOrdersFeedModal;
