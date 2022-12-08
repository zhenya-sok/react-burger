import React, { FC, useEffect, useState } from 'react';
import styles from './order-feed-item.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { IOrderItem } from '../../types/wsTypes';
import { useSelector } from '../../utils/hooks/hooks';
import OrderIngredientsImages from '../order-ingredient-image/order-ingredient-image';
import OrderStatusItemComponent from '../order-status-item-component/order-status-item-component';

interface IOrderFeedItemProps {
    wsOrderDetail: IOrderItem;
}

const OrderFeedItem: FC<IOrderFeedItemProps> = ({ wsOrderDetail }) => {
    const [isVisibleStatus, setIsVisibleStatus] = useState<boolean>(false);

    useEffect(() => {
        pathname === '/feed' ? setIsVisibleStatus(false) : setIsVisibleStatus(true);
    }, []);

    const location = useLocation();
    const history = useHistory();
    const pathname = location.pathname;

    function navigate(id: string) {
        history.push(`${pathname}/${id}`, { background: location });        
    }
    
    const visibleIngredients = [...wsOrderDetail.ingredients];

    if (visibleIngredients.length > 5) {
        visibleIngredients.length = 5;
    }

    const ingredinentsData = useSelector((state) => state.ingredientsReducer.ingredients);

    const orderPrice = wsOrderDetail.ingredients.reduce(function(sum, ingredientId) {
        const ingredientInfo = ingredinentsData && ingredinentsData.filter((e) => e._id === ingredientId)[0];

        return sum + ingredientInfo.price;
    }, 0)

    const unvisibleIngredientsLength = wsOrderDetail.ingredients.length - visibleIngredients.length;
    const lastVisibleIngredient = wsOrderDetail.ingredients[6];   
    
    let zIndex = 1111;

    return (
        <article className={`${styles.wrapper} mr-2`} onClick={() => navigate(wsOrderDetail._id)}>
            <div className={`${styles.row}`}>
                <span className={`${styles.orderNumber} text text_type_digits-default`}>#{wsOrderDetail.number}</span>
                <span className={`${styles.date} text text_type_main-default text_color_inactive`}>
                    <FormattedDate date={new Date(wsOrderDetail.createdAt)} />
                </span>
            </div>
            
            <div>
                <div className={`${styles.orderName} text text_type_main-medium`}>{wsOrderDetail.name}</div>
                {isVisibleStatus && wsOrderDetail && <OrderStatusItemComponent orderStatus={wsOrderDetail.status}/>}
            </div>

            <div className={`${styles.row}`}>
                <ul className={styles.ingredientsImadesList}>
                    {visibleIngredients && visibleIngredients.map((item: string, index) => {
                        return (
                            <li key={index} className={styles.ingredientImageListItem} style={{ zIndex: `${zIndex--}` }}>
                                <OrderIngredientsImages ingredientId={item} />
                            </li>
                        )
                    })}

                    {(unvisibleIngredientsLength !== 0 && lastVisibleIngredient) && 
                    <li className={styles.lastVisibleIngredientImage}>
                        <OrderIngredientsImages ingredientId={lastVisibleIngredient} isOpacity={true} />
                        <span className="text text_type_digits-default">+{unvisibleIngredientsLength}</span>
                    </li>}
                </ul>
                <div className={`${styles.orderPrice}  mr-10`}>
                    <span className="text text_type_digits-default">{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </article>
    )
}

export default OrderFeedItem;
