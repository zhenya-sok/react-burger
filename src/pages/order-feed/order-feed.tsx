import React, { FC, useEffect } from 'react';
import styles from './order-feed.module.css';
import OrderList from '../../components/orders-list/orders-list';
import OrdersStatus from '../../components/orders-status/orders-status';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from '../../services/constants';

const OrderFeed: FC = () => {
    const dispatch = useDispatch();

    const ORDERS_SERVER_LIVE = "wss://norma.nomoreparties.space/orders/all";

    useEffect((): any => {
        dispatch({ type: ORDERS_CONNECT, payload: ORDERS_SERVER_LIVE });

        return () => dispatch({ type: ORDERS_DISCONNECT })
    }, [])

    const wsData = useSelector((state) => state.wsReducer.orders);
    const wsDataOrders = wsData && wsData.orders;

    return (
        <main className={styles.mainWrapper}>
            {wsDataOrders && <OrderList title="Лента заказов" wsOrdersDetails={wsDataOrders} />}
            <OrdersStatus />
        </main>
    )
}

export default OrderFeed;
