import React from 'react';
import styles from './order-details.module.css';
import orderIsAccepted from '../../images/orderIsAccepted.svg';
import PropTypes from 'prop-types';

const OrderDetails = ({bookingNumber}) => {
    return(
        <div className={styles.wrapper}>
            <p className={`${styles.orderDetails__bookingNumber} text text_type_digits-large mt-4 mb-8`}>{bookingNumber}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img className={styles.orderDetails__image} src={orderIsAccepted} alt="заказ принят иконка" />
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    bookingNumber: PropTypes.string.isRequired,
}

export default OrderDetails;
