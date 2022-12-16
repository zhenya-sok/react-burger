import React, { FC } from 'react';
import styles from './order-details.module.css';
import orderIsAccepted from '../../images/orderIsAccepted.svg';

interface IOrderDetailsProps {
    bookingNumber: number;
}

const OrderDetails: FC<IOrderDetailsProps> = ({bookingNumber}) => {

    return(
        <div className={styles.wrapper}>
            <p className={`${styles.orderDetails__bookingNumber} text text_type_digits-large mt-4 mb-8`}>{bookingNumber}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className={styles.orderDetails__image}></div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;
