import React, { FC } from 'react';
import styles from './order-feed.module.css';
import OrderList from '../../components/orders-list/orders-list';
import OrdersStatus from '../../components/orders-status/orders-status';

const OrderFeed: FC = () => {
    return (
        <main className={styles.mainWrapper}>
            <OrderList title="Лента заказов"/>
            <OrdersStatus />
        </main>
    )
}

export default OrderFeed;
