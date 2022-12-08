import React, { FC, useEffect } from 'react';
import styles from './profile-orders.module.css';
import { PROFILE_ORDERS_CONNECT, PROFILE_ORDERS_DISCONNECT } from '../../../services/constants';
import { useDispatch, useSelector } from '../../../utils/hooks/hooks';
import Cookies from 'js-cookie';
import OrdersList from '../../../components/orders-list/orders-list';


const ProfileOrders: FC = () => {

    const dispatch = useDispatch();

    const accessToken = Cookies.get("accessToken");
    const token = accessToken?.replace("Bearer ","");
    
    const PROFILE_ORDERS_SERVER_LIVE = `wss://norma.nomoreparties.space/orders/?token=${token}`;

    useEffect(() => {
        dispatch({ type: PROFILE_ORDERS_CONNECT, payload: PROFILE_ORDERS_SERVER_LIVE });
    }, [dispatch])

    useEffect((): any => {
        return () => dispatch({ type: PROFILE_ORDERS_DISCONNECT })
    }, [])

    const wsData = useSelector((state) => state.wsReducer.orders);
    const wsDataOrders = wsData && wsData.orders;

    return (
        <div>
            {wsDataOrders && <OrdersList wsOrdersDetails={wsDataOrders}/>}
        </div>
    )
}

export default ProfileOrders;
