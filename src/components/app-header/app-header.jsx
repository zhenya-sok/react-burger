import React from 'react';
import styles from './app-header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className="p-4 text text_type_main-default">
            <nav className={styles.navWrapper}>
                <div className={styles.navBtn}>
                    <div className={`${styles.navBtn} mr-2 pl-5 pr-5 pb-4 pt-4`}>
                        <BurgerIcon type="primary" />
                        <span className="ml-2">
                            <a className={`${styles.constructorLink} text text_type_main-default`} href="#">Конструктор</a>
                        </span>
                    </div>
                    <div className={`${styles.navBtn} pl-5 pr-5 pb-4 pt-4`}>
                        <ListIcon type="secondary" />
                        <span className="ml-2">
                            <a className="text text_type_main-default text_color_inactive" href="#">Лента заказов</a>
                        </span>
                    </div>
                </div>

                <div className={styles.logo}>
                    <Logo />
                </div>

                <div className={`${styles.navBtn} ${styles.profileBtn} pl-5 pr-5 pb-4 pt-4`}>
                    <ProfileIcon type="secondary" />
                    <span className="ml-2">
                        <a className="text text_type_main-default text_color_inactive" href="#">Личный кабинет</a>
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
