import React from 'react';
import styles from './burger-constructor.module.scss';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/example.svg';

const BurgerConstructor = () => {
    return (
        <section className={`${styles.constructorWrapper} pl-4 pr-4 pt-25`}>
            <div className={styles.constructorList}>  
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>  
            </div>

            <div className={`${styles.orderInfo} mt-10`}>
                <div className={`${styles.finalPrice}  mr-10`}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;
