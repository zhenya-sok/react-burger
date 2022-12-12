import React, { FC } from 'react';
import { IOrderItem } from '../../types/wsTypes';
import { useSelector } from '../../utils/hooks/hooks';
import styles from './orders-status.module.css';

const OrdersStatus: FC = () => {
    const wsOrdersData = useSelector((state) => state.wsReducer.orders);
    const wsOrdersDetails = wsOrdersData && wsOrdersData.orders;

    const total = wsOrdersData && wsOrdersData.total;
    const totalToday = wsOrdersData && wsOrdersData.totalToday;

    const wsReadyOrders = wsOrdersDetails && wsOrdersDetails.filter((item: IOrderItem) => item.status === "done");
    const wsInWorkOrders = wsOrdersDetails && wsOrdersDetails.filter((item: IOrderItem) => item.status !== "done");

    if (wsReadyOrders) {
        wsReadyOrders.length = 15;
    }

    return (
        <main className={`${styles.ordersStatusWrapper} pl-10 pt-25`}>
            <section className={`${styles.ordersStatus__status} mb-15`}>
                <div>
                    <h1 className="text text_type_main-medium mb-6">Готовы:</h1>
                    <ul className={styles.orderStatus__status_readyList}>
                        {wsReadyOrders && wsReadyOrders.map((item: IOrderItem) => {
                            return (
                                <li key={item._id} className="text text_type_digits-default">
                                    {item.number}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h1 className="text text_type_main-medium mb-6">В работе:</h1>
                    <ul className={styles.orderStatus__status_inWorkList}>
                        {wsInWorkOrders && wsInWorkOrders.map((item: IOrderItem) => {
                            return (
                                <li key={item._id} className="text text_type_digits-default">
                                    {item.number}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>

            <section className="mb-15">
                <h1 className="text text_type_main-medium">Выполнено за все время</h1>
                <span className={`${styles.textShadow} text text_type_digits-large`}>{total}</span>
            </section>

            <section>
                <h1 className="text text_type_main-medium">Выполнено за сегодня</h1>
                <span className={`${styles.textShadow} text text_type_digits-large`}>{totalToday}</span>
            </section>
        </main>
    )
}

export default OrdersStatus;
