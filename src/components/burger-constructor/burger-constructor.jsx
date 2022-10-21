import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { loadOrderDetails } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderDetail } from '../../services/actions';
import { useDrag, useDrop } from 'react-dnd';

const BurgerConstructor = () => {
    const { selectedIngredients, appSelectedIngredient } = useContext(IngredientDataContext);
    const [orderVisible, setOrderVisible] = useState(false);
    const dispatch = useDispatch();
    const selectedBun = selectedIngredients && selectedIngredients.find((item) => item.type === "bun");
    const selectedIngredientsId = selectedIngredients.map((item) => item._id);
    const orderData = useSelector((state) => state.ingredientsReducer.orderData);

    console.log(orderData);

    const newOrder = {
        ingredients: [...selectedIngredientsId],
    };

    const orderPrice = selectedIngredients.reduce((all, current) => {
        if (current.type === "bun") {
            return all + (current.price * 2);
        } else {
            return all + current.price;
        }
    }, 0)

    const showOrderNumber = () => {
        setOrderVisible(true);

        dispatch(setOrderDetail(newOrder))

        // loadOrderDetails(newOrder)
        //     .then((value) => dispatch(setOrderDetail(value)))
        //     .catch(err => {
        //         alert("Произошла ошибка при загрузке данных.")
        //     });
    };

    const closeOrderNumber = () => {
        setOrderVisible(false);
    };    
     
    return (
        <section 
        className={`${styles.constructorWrapper}  pl-4 pt-25`} >
            <div className={styles.constructorList}>

                {selectedBun &&
                    <div className="mr-4">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={selectedBun.name + " (верх)"}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}
                        />
                    </div>
                }

                <div className={`${styles.ingredientsCombo} mt-4 mb-4 pr-2`}>
                    {selectedIngredients && selectedIngredients.map((item, index) => {
                        if (item.type !== "bun")
                            return (
                                <div className={`${styles.ingredientItem} mb-4`} key={index}>
                                    <DragIcon />
                                    <ConstructorElement
                                        onClick={() => console.log("hi")}
                                        isLocked={false}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </div>
                            )
                    })}
                </div>

                {selectedBun &&
                    <div className="mr-4">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={selectedBun.name + " (низ)"}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}
                        />
                    </div>
                }
            </div>

            <div className={`${styles.orderInfo} mt-10`}>
                <div className={`${styles.finalPrice}  mr-10`}>
                    <span className="text text_type_digits-medium">{orderPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={showOrderNumber}>Оформить заказ</Button>
            </div>
            {orderVisible && orderData.order && (
                <Modal closeModal={closeOrderNumber}>
                    <OrderDetails bookingNumber={orderData.order && orderData.order.number} />
                </Modal>
            )}
        </section>
    )
}

export default BurgerConstructor;
