import React, { FC } from 'react';
import styles from './order-feed-item.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation, useParams } from 'react-router-dom';

interface IOrderFeedItemProps {

}

const OrderFeedItem: FC<IOrderFeedItemProps> = () => {
    const location = useLocation();
    const history = useHistory();
    const pathname  = location.pathname;

    function navigate(id: string) {
        history.push(`${pathname}/${id}`, { background: location });
    }

    return (
        <article className={`${styles.wrapper} mr-2`} onClick={() => navigate("123")}>
            <div className={`${styles.row}`}>
                <span className={`${styles.orderNumber} text text_type_digits-default`}>#12345</span>
                <span className={`${styles.date} text text_type_main-default text_color_inactive`}>Сегодня, 16:21</span>    
            </div>
            <div className={`${styles.orderName} text text_type_main-medium`}>Death Star Starship Main бургер</div>
            <div className={`${styles.row}`}>
                <div>
                    {/* <OrderItemIngredientImage /> */}
                    sss
                </div>
                <div className={`${styles.orderPrice}  mr-10`}>
                    <span className="text text_type_digits-default">485</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </article>
        
    )
}

export default OrderFeedItem;
