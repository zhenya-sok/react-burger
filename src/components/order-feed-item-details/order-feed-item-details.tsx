import React, { FC } from 'react';
import styles from './order-feed-item-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IParams {
    id: string;
};

const OrderFeedItemDetail: FC = () => {

    const { id } = useParams<IParams>();

    // @ts-ignore
    // const ingredientInfo = useSelector((state) => state.ingredientsReducer.ingredients.filter((e) => e._id === id))[0];


    return (
        <article className={styles.wrapper} >
            <span className={`${styles.orderNumber} text text_type_digits-default mb-10`}>#12345</span>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>Black Hole Singularity острый бургер</h1>
            <span className={`${styles.orderStatus} text text_type_main-small mb-15`}>Выполнен</span>
            <h2 className="text text_type_main-medium mb-6">Состав:</h2>
            <ul className={`${styles.orderIngredientsList} mb-10`}>
                <li className={styles.orderIngredientsList__item}>
                    <div className={styles.ingredientImage}>sss</div>
                    <span className={`${styles.ingredientName} text text_type_main-small`}>Флюоресцентная булка R2-D3</span>
                    <div className={`${styles.ingredientPrice} mr-6`}>
                        <span className="text text_type_digits-default">485</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={styles.orderIngredientsList__item}>
                    <div className={styles.ingredientImage}>sss</div>
                    <span className={`${styles.ingredientName} text text_type_main-small`}>Флюоресцентная булка R2-D3</span>
                    <div className={`${styles.ingredientPrice}  mr-6`}>
                        <span className="text text_type_digits-default">485</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={styles.orderIngredientsList__item}>
                    <div className={styles.ingredientImage}>sss</div>
                    <span className={`${styles.ingredientName} text text_type_main-small`}>Флюоресцентная булка R2-D3</span>
                    <div className={`${styles.ingredientPrice}  mr-6`}>
                        <span className="text text_type_digits-default">485</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            </ul>
            <div className={styles.finalOrderInfo}>
                <div className="text text_type_main-default text_color_inactive">Вчера, 13:52</div>
                <div className={styles.orderPrice}>
                    <span className="text text_type_digits-default">1231</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </article>
    )  
}

export default OrderFeedItemDetail;
