import React, { FC } from 'react';
import styles from './profile-nav-menu.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/actions/authActions';
import { useLocation } from 'react-router-dom';

const ProfileNavMenu: FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const logoutUser = () => {
        // @ts-ignore
        dispatch(logout());
    }

    return (
        <section className={styles.profileNavMenu}>
            <ul className="mb-20 pl-5">
                <li><NavLink to="/profile" activeClassName={styles.activeNavBtn} exact>Профиль</NavLink></li>
                <li>
                    <NavLink
                        to="/profile/orders" activeClassName={styles.activeNavBtn} exact>
                        История заказов
                    </NavLink>
                </li>
                <li><span onClick={() => logoutUser()}>Выход</span></li>
            </ul>

            {(location.pathname === "/profile") &&
            <div className={`${styles.profileNavMenu__info} text_type_main-small pl-5`}>
                В этом разделе вы можете <br />
                изменить свои персональные данные
            </div>}

            {(location.pathname === "/profile/orders") &&
            <div className={`${styles.profileNavMenu__info} text_type_main-small pl-5`}>
                В этом разделе вы можете <br />
                посмотреть свою историю заказов
            </div>}
        </section>
    )
}

export default ProfileNavMenu;
