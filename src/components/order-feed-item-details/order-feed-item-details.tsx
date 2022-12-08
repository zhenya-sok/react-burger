import React, { FC, useEffect } from 'react';
import styles from './order-feed-item-details.module.css';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderItem } from '../../types/wsTypes';
import OrderIngredientImage from '../order-ingredient-image/order-ingredient-image';
import { IIngredientData } from '../../types/burgerTypes';
import OrderStatusItemComponent from '../order-status-item-component/order-status-item-component';
import { getOrderInfoByNumber } from '../../services/actions/orderDetailActions';

interface IParams {
    id: string;
};

const OrderFeedItemDetail: FC = () => {

    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    const location = useLocation();
        
    useEffect(() => {
        orderItemInfo && dispatch(getOrderInfoByNumber(orderItemInfo?.number));
    }, [dispatch])
    
    const wsOrders = useSelector((state) => state.wsReducer.orders);
    const wsOrderData = wsOrders && wsOrders.orders;
    
    const orderItemInfo = wsOrderData && wsOrderData.filter((e: IOrderItem) => e._id === id)[0];

    const ingredientsData = useSelector((state) => state.ingredientsReducer.ingredients);

    const orderPrice = orderItemInfo && orderItemInfo.ingredients.reduce(function(sum: number, ingredientId: string) {
    const ingredientInfo = ingredientsData.filter((e: IIngredientData) => e._id === ingredientId)[0];

        return sum + ingredientInfo.price;
    }, 0)    

    const uniqArray = orderItemInfo && Array.from(new Set(orderItemInfo.ingredients));
        
    return (
        <article className={styles.wrapper}>
            <span className={`${location.state ? styles.orderNumberModal : styles.orderNumber} text text_type_digits-default mb-10`}>#{orderItemInfo?.number}</span>
            <h1 className={`${location.state ? styles.orderNameMargin : styles.orderName} text text_type_main-medium mb-3`}>{orderItemInfo?.name}</h1>

            {orderItemInfo && <OrderStatusItemComponent orderStatus={orderItemInfo.status}/>}
            
            <h2 className="text text_type_main-medium  mt-15 mb-6">Состав:</h2>
            <ul className={`${styles.orderIngredientsList} mb-10`}>
                {uniqArray && uniqArray.map((item, index) => {
                    const ingredientInfo = ingredientsData.filter((info) => info._id === item)[0];
                    const ingredientAmount = Array.from(orderItemInfo.ingredients.entries()).filter((i) => i[1] === item).length;
                    
                    return (
                        <li key={index} className={styles.orderIngredientsList__item}>
                            {<OrderIngredientImage ingredientId={item} />}
                            <span className={`${styles.ingredientName} text text_type_main-default`}>{ingredientInfo.name}</span>
                            <div className={`${styles.ingredientPrice} mr-6`}>
                                <span className="text text_type_digits-default">
                                    {ingredientAmount} x {ingredientInfo.price}
                                </span>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    )
                })}
            </ul>
            
            <div className={styles.finalOrderInfo}>
                <div className="text text_type_main-default text_color_inactive">
                    {orderItemInfo && <FormattedDate date={new Date(orderItemInfo.createdAt)} />}
                </div>
                <div className={styles.orderPrice}>
                    <span className="text text_type_digits-default">{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </article>
    )
}

export default OrderFeedItemDetail;
