import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectIngredient, deleteSelectIngredient, setOrderDetail, updateIngredientsList } from '../../services/actions';
import { useDrop } from 'react-dnd';
import ConstructorElementWrapper from './constructor-element-wrapper';

const BurgerConstructor = () => {
    const { selectedIngredients, appSelectedIngredient } = useContext(IngredientDataContext);
    const [orderVisible, setOrderVisible] = useState(false);
    const dispatch = useDispatch();
    const selectedBun = selectedIngredients && selectedIngredients.find((item) => item.type === "bun");
    const selectedIngredientsId = selectedIngredients.map((item) => item._id);
    const orderData = useSelector((state) => state.ingredientsReducer.orderData);
    const dragInsertBefore = useRef();

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
    };

    const closeOrderNumber = () => {
        setOrderVisible(false);
    };

    const deleteSelectedIngredient = (ingredientItem) => {
        const selectedIngredientsCopy = [...selectedIngredients];
        const deleteElementIndex = selectedIngredientsCopy.findIndex((elem) => elem._id === ingredientItem._id)

        selectedIngredientsCopy.splice(deleteElementIndex, 1);
        dispatch(updateIngredientsList(selectedIngredientsCopy));
    }

    const [{ isHover }, dropTargetRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(ingredientData) {
            appSelectedIngredient(ingredientData);
        }
    });

    const [{ isSelectedHover }, selectedDropTargetRef] = useDrop({
        accept: 'selected-ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        hover(item, monitor) {
            const coords = monitor.getClientOffset();
            const elementFromPoint = document.elementFromPoint(coords.x, coords.y)
            const wrapper = elementFromPoint.closest(`.${styles.ingredientItem}`)

            if (!wrapper) {
                return
            }
            const insertBeforeDragId = wrapper.getAttribute('data-drag-id')
            dragInsertBefore.current = insertBeforeDragId
        },
        drop(item) {
            if (item.ingredientType === 'bun') return

            const selectedIngredientsCopy = [...selectedIngredients]
            const draggingElement = selectedIngredientsCopy.find((ingr) => ingr.dragId === item.dragId)
            const insertBeforeElementIndex = selectedIngredientsCopy.findIndex((ingr) => ingr.dragId === dragInsertBefore.current)
            const insertBeforeElement = selectedIngredientsCopy[insertBeforeElementIndex]

            if (insertBeforeElementIndex === -1) {
                return
            }

            if (insertBeforeElementIndex === selectedIngredientsCopy.length - 1) {
                draggingElement.position = insertBeforeElement.position + 1
            } else {
                if (draggingElement.position < insertBeforeElement.position) {
                    const afterInsertBeforeElementIndex = insertBeforeElementIndex + 1
                    const afterInsertBeforeElement = selectedIngredientsCopy[afterInsertBeforeElementIndex]
                    draggingElement.position = (insertBeforeElement.position + afterInsertBeforeElement.position) / 2
                } else {
                    const beforeInsertBeforeElementIndex = insertBeforeElementIndex - 1
                    const beforeInsertBeforeElement = selectedIngredientsCopy[beforeInsertBeforeElementIndex]
                    draggingElement.position = (insertBeforeElement.position + beforeInsertBeforeElement.position) / 2
                }
            }

            selectedIngredientsCopy.sort((a, b) => a.position - b.position)
            dispatch(updateIngredientsList(selectedIngredientsCopy))
        }
    })

    return (
        <section className={`${styles.constructorWrapper} ${isHover || isSelectedHover ? styles.onHover : ''} pl-4 pt-25`} ref={(el) => { dropTargetRef(el); selectedDropTargetRef(el) }}>
            <div className={styles.constructorList}>

                {selectedBun &&
                    <div className={`${styles.bunIngredient} "mr-4 mb-4"`}>
                        <ConstructorElementWrapper
                            type="top"
                            ingredientType="bun"
                            isLocked={true}
                            text={selectedBun.name + " (верх)"}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image}
                        />
                    </div>
                }

                <div className={`${styles.ingredientsCombo} mt-4 mb-4 pr-2`}>
                    {selectedIngredients && selectedIngredients.map((item) => {
                        if (item.type !== "bun")
                            return (
                                <ConstructorElementWrapper
                                    key={item.dragId}
                                    dragId={item.dragId}
                                    handleClose={() => deleteSelectedIngredient(item)}
                                    isLocked={false}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    draggable={true}
                                    ingredientType={item.type}
                                />
                            )
                    })}
                </div>

                {selectedBun &&
                    <div className={`${styles.bunIngredient} "mt-4"`}>
                        <ConstructorElementWrapper
                            type="bottom"
                            ingredientType="bun"
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
