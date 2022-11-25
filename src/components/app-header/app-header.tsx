import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';

const AppHeader: FC = () => {
    return (
        <header className="p-4 text text_type_main-default">
            <nav className={styles.navWrapper}>
                <div className={styles.navBtn}>
    
                    <div className={`${styles.navBtn} mr-2 pl-5 pr-5 pb-4 pt-4`}>
                        <div className="ml-2">
                            <NavLink
                                to="/"
                                className={`${styles.constructorLink} text text_type_main-default text_color_inactive`}
                                activeClassName={styles.activeNavBtn}
                                exact>
                                    <div className={styles.navBtn__icon}><BurgerIcon type="secondary" /></div>
                                    Конструктор
                            </NavLink>
                        </div>
                    </div>

                    <div className={`${styles.navBtn} pl-5 pr-5 pb-4 pt-4`}>
                        <div className="ml-2">
                            <NavLink 
                                to="/profile/orders"
                                className="text text_type_main-default text_color_inactive"
                                activeClassName={styles.activeNavBtn}
                                exact>
                                    <div className={styles.navBtn__icon}><ListIcon type="secondary" /></div>
                                    Лента заказов
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className={styles.logo}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <div className={`${styles.navBtn} ${styles.profileBtn} pl-5 pr-5 pb-4 pt-4`}>
                    <div className="ml-2">
                        <NavLink
                            to="/profile"
                            className="text text_type_main-default text_color_inactive"
                            activeClassName={styles.activeNavBtn}
                            exact>
                                <div className={styles.navBtn__icon}><ProfileIcon type="secondary" /></div>
                                Личный кабинет
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
