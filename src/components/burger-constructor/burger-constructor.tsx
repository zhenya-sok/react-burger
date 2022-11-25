import React, { useState, useRef, FC } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectIngredient, setOrderDetail, updateIngredientsList } from '../../services/actions/ingredientsActions';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import ConstructorElementWrapper from './constructor-element-wrapper';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { IIngredientData } from '../../types/types';

interface IDragId extends IIngredientData {
    dragId: string;
}

const BurgerConstructor: FC = () => {
    // @ts-ignore
    const selectedIngredients = useSelector((state) => state.constructorReducer.selectedIngredients);
    const [orderVisible, setOrderVisible] = useState(false);
    const dispatch = useDispatch();
    const selectedBun = selectedIngredients && selectedIngredients.find((item: IIngredientData) => item.type === "bun");
    // @ts-ignore
    const orderData = useSelector((state) => state.orderReducer.orderData);
    const dragInsertBefore = useRef<undefined | string>();

    const appSelectedIngredient = (ingredientRaw: IIngredientData) => {
        const ingredient = {
            ...ingredientRaw,
            position: selectedIngredients.length + 1,
            dragId: uuid()
        }

        const bunIndex = selectedIngredients.findIndex((item: IIngredientData) => item.type === "bun");

        if (ingredient.type === "bun" && bunIndex !== -1) {
            const newSelectedIngredients = [...selectedIngredients];
            newSelectedIngredients.splice(bunIndex, 1, ingredient);

            dispatch(addSelectIngredient(newSelectedIngredients));
            return
        }

        dispatch(addSelectIngredient([...selectedIngredients, ingredient]))
        return true;
    }

    const orderPrice = selectedIngredients.reduce((all: number, current: IIngredientData) => {
        if (current.type === "bun") {
            return all + (current.price * 2);
        } else {
            return all + current.price;
        }
    }, 0)

    // @ts-ignore
    const isAuth = useSelector((state) => !!state.authReducer.token);
    const history = useHistory();

    const showOrderNumber = () => {
        if (!isAuth) {
            history.replace({ pathname: `/login` });
        } else {
            const [bunId, ...rest] = selectedIngredients.map((item: IIngredientData) => item._id);

            // @ts-ignore
            dispatch(setOrderDetail({
                ingredients: [bunId, ...rest, bunId],
            }))

            setOrderVisible(true);
        }
    };

    const closeOrderNumber = () => {
        setOrderVisible(false);
        dispatch(addSelectIngredient([]));
    };

    const deleteSelectedIngredient = (ingredientItem: IIngredientData) => {
        const selectedIngredientsCopy = [...selectedIngredients];
        const deleteElementIndex = selectedIngredientsCopy.findIndex((elem) => elem._id === ingredientItem._id)

        selectedIngredientsCopy.splice(deleteElementIndex, 1);
        dispatch(updateIngredientsList(selectedIngredientsCopy));
    }

    const [{ isHover }, dropTargetRef] = useDrop<any, IIngredientData, any>({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(ingredientData, monitor) {
            appSelectedIngredient(ingredientData);
        }
    });

    const [{ isSelectedHover }, selectedDropTargetRef] = useDrop<any, IIngredientData, any>({
        accept: 'selected-ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        hover(item, monitor) {
            const coords = monitor.getClientOffset();
            if (coords === null) return;
            const elementFromPoint = document.elementFromPoint(coords.x, coords.y);
            if (elementFromPoint === null) return
            const wrapper = elementFromPoint.closest(`.${styles.ingredientItem}`)

            if (!wrapper) {
                return
            }
            const insertBeforeDragId = wrapper.getAttribute('data-drag-id')
            if (insertBeforeDragId === null) return
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
        <section className={`${styles.constructorWrapper} 
            ${isHover || isSelectedHover ? styles.onHover : ''} pl-4 pt-25`}
            ref={(el) => { dropTargetRef(el); selectedDropTargetRef(el) }}>

            <div className={styles.constructorList}>

                {selectedBun &&
                    <div className={`${styles.bunIngredient} "mr-4 mb-4"`}>
                        <ConstructorElementWrapper
                            dragId={selectedBun.dragId}
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
                    {selectedIngredients && selectedIngredients.map((item: IDragId) => {
                        if (item.type !== "bun")
                            return (
                                <ConstructorElementWrapper
                                    type={item.type}
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
                            dragId={selectedBun.dragId}
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
                <Button htmlType="button" type="primary" size="large"
                    disabled={!selectedBun}
                    onClick={showOrderNumber}
                >
                    Оформить заказ
                </Button>
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
