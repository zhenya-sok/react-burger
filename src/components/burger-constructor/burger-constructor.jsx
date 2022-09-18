import React from 'react';
import styles from './burger-constructor.module.scss';
import PropTypes from 'prop-types';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {ingredientPropTypes} from '../../utils/ingredientPropType';

const BurgerConstructor = ({ ingredients }) => {
    const [orderVisible, setOrderVisible] = React.useState(false);

    const showOrderNumber = () => {
        setOrderVisible(true);
    };

    const closeOrderNumber = () => {
        setOrderVisible(false);
    };

    const burgerFilling = ingredients && ingredients.filter((item) => item.type !== "bun");
    const burgerBuns = ingredients && ingredients.filter((item) => item.type === "bun");
    const bunImg = burgerBuns && burgerBuns.map((item) => item.image);

    return (
        <section className={`${styles.constructorWrapper} pl-4 pt-25`}>
            <div className={styles.constructorList}>

                {/* На данном этапе обучения решил захардкодить изображение верхней и нижней булки */}
                <div className="mr-4">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={bunImg && bunImg[0]}
                    />
                </div>

                <div className={`${styles.ingredientsCombo} mt-4 mb-4 pr-2`}>
                    {burgerFilling && burgerFilling.map((item, index) => {
                        return (
                            <div className={`${styles.ingredientItem} mb-4`} key={index}>
                                <DragIcon />
                                <ConstructorElement
                                    type="top"
                                    isLocked={false}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="mr-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bunImg && bunImg[0]}
                    />
                </div>
            </div>

            <div className={`${styles.orderInfo} mt-10`}>
                <div className={`${styles.finalPrice}  mr-10`}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={showOrderNumber}>Оформить заказ</Button>
            </div>
            {orderVisible && <Modal closeModal={closeOrderNumber}>
                <OrderDetails bookingNumber="034536" />
            </Modal>}
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
