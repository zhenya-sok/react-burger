import React from 'react';
import styles from './app-header.module.scss';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className="p-4 text text_type_main-default">
            <nav className={styles.navWrapper}>
                <div className={styles.navBtn}>
                    <div className={`${styles.navBtn} mr-2 pl-5 pr-5 pb-4 pt-4`}>
                        <BurgerIcon type="primary" />
                        <span className="ml-2">Конструктор</span>
                    </div>
                    <div className={`${styles.navBtn} pl-5 pr-5 pb-4 pt-4`}>
                        <ListIcon type="primary" />
                        <span className="ml-2">Лента заказов</span>
                    </div>
                </div>

                <div className={styles.logo}>
                    <Logo />
                </div>

                <div className={`${styles.navBtn} ${styles.profileBtn} pl-5 pr-5 pb-4 pt-4`}>
                    <ProfileIcon type="primary" />
                    <span className="ml-2">Личный кабинет</span>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
