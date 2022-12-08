import React, { FC } from 'react';
import styles from './orders-list.module.css';
import OrderFeedItem from '../order-feed-item/order-feed-item';
import { IOrderItem } from '../../types/wsTypes';

interface IOrdersListProps {
    title?: string;
    wsOrdersDetails: IOrderItem[];
}

const OrdersList: FC<IOrdersListProps> = ({ title, wsOrdersDetails }) => {

    return (wsOrdersDetails && (
        <section className={`${styles.ordersListWrapper} mr-5`}>
            <h1 className="text text_type_main-large mt-10 mb-5`">{title}</h1>

            <ul className={`${styles.ordersList} mt-10`}>
                {wsOrdersDetails && wsOrdersDetails.map((item: IOrderItem) => {
                    return (
                        <li key={item._id}>
                            <OrderFeedItem wsOrderDetail={item}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    ))
}

export default OrdersList;
