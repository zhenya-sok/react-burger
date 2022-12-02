import React, { FC } from 'react';
import styles from './orders-status.module.css';

const OrdersStatus: FC = () => {

    return (
        <main className={`${styles.ordersStatusWrapper} pl-10 pt-25`}>
            <section className={`${styles.ordersStatus__status} mb-15`}>
                <div>
                    <h1 className="text text_type_main-medium mb-6">Готовы:</h1>
                    <ul className={styles.orderStatus__status_readyList}>
                        <li className="text text_type_digits-default">111</li>
                        <li className="text text_type_digits-default">111</li>
                        <li className="text text_type_digits-default">111</li>
                        <li className="text text_type_digits-default">111</li>
                        <li className="text text_type_digits-default">111</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text text_type_main-medium mb-6">В работе:</h1>
                    <ul className={styles.orderStatus__status_inWorkList}>
                        <li className="text text_type_digits-default">111</li>
                        <li className="text text_type_digits-default">111</li>
                        <li className="text text_type_digits-default">111</li>
                    </ul>
                </div>
            </section>

            <section className="mb-15">
                <h1 className="text text_type_main-medium">Выполнено за все время</h1>
                <span className={`${styles.textShadow} text text_type_digits-large`}>28 752</span>
            </section>

            <section>
                <h1 className="text text_type_main-medium">Выполнено за сегодня</h1>
                <span className={`${styles.textShadow} text text_type_digits-large`}>138</span>
            </section>
        </main>
    )
}

export default OrdersStatus;
