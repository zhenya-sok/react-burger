import React, { FC } from 'react';
import styles from './orders-list.module.css';
import OrderFeedItem from '../order-feed-item/order-feed-item';

interface IOrdersListProps {
    title?: string;
}

const OrdersList: FC<IOrdersListProps> = ({title}) => {

    return (
        <section className={`${styles.ordersListWrapper} mr-5`}>
            <h1 className="text text_type_main-large mt-10 mb-5`">{title}</h1>

            <ul className={`${styles.ordersList} mt-10`}>
                {/* {ingredients && ingredients.map((ingredient) => { */}
                    {/* return ( */}
                        <li><OrderFeedItem /></li>
                        <li><OrderFeedItem /></li>
                        <li><OrderFeedItem /></li>
                        <li><OrderFeedItem /></li>
                        <li><OrderFeedItem /></li>
                    {/* ) */}
                {/* })} */}
            </ul>
        </section>
    )
}

export default OrdersList;
