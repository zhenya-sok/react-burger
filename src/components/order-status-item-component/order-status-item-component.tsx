import React, { FC } from 'react';
import styles from './order-status-item-component.module.css';

interface IOrderStatusItemComponentProps {
    orderStatus: string;
}

const OrderStatusItemComponent: FC<IOrderStatusItemComponentProps> = ({ orderStatus }) => {

    let orderStatusClassName = `${styles.orderStatus}`;

    switch (orderStatus) {
        case "done": 
            orderStatus = "Выполнен";
            orderStatusClassName += ` ${styles.orderStatus__done}`;
            break;
        case "created":
            orderStatus = "Создан";
            break;
        case "pending":
            orderStatus = "Готовится";
            break;
        case "done": 
            orderStatus = "Отменен";
            orderStatusClassName += ` ${styles.orderStatus__canceled}`;
            break;
    }

    return (
        <>
           <span className={`${orderStatusClassName} text text_type_main-small`}>{orderStatus}</span>
        </>
    )
}

export default OrderStatusItemComponent;
