import React, { FC, useEffect } from 'react';
import { PROFILE_ORDERS_CONNECT, PROFILE_ORDERS_DISCONNECT, PROFILE_ORDERS_WS_MESSAGE } from '../../../services/constants';
import { useDispatch, useSelector } from '../../../utils/hooks/hooks';
import Cookies from 'js-cookie';
import OrdersList from '../../../components/orders-list/orders-list';


const ProfileOrders: FC = () => {
    const dispatch = useDispatch();

    const accessToken = Cookies.get("accessToken");
    const token = accessToken?.replace("Bearer ","");
    const PROFILE_ORDERS_SERVER_LIVE = `wss://norma.nomoreparties.space/orders?token=${token}`;

    useEffect((): any => {
        dispatch({ type: PROFILE_ORDERS_CONNECT, payload: PROFILE_ORDERS_SERVER_LIVE });

        return () => dispatch({ type: PROFILE_ORDERS_DISCONNECT })
    }, [])

    const wsData = useSelector((state) => state.wsProfileReducer.orders);
    const wsDataOrders = wsData && wsData.orders;
    const reverseWsDataOrders = wsDataOrders && [...wsDataOrders].reverse()

    return (
        <div>
            {reverseWsDataOrders && <OrdersList wsOrdersDetails={reverseWsDataOrders}/>}
        </div>
    )
}

export default ProfileOrders;
