import React, { FC } from 'react';
import styles from './profile.module.css';
import { Switch, Route } from 'react-router-dom';
import ProfileNavMenu from './profile-nav-menu/profile-nav-menu';
import ProfileInfo from './profile-info/profile-info';
import ProfileOrders from '../profile/profile-orders/profile-orders';

const Profile: FC = () => {

    return (
        <section className={`${styles.profileWrapper} text text_type_main-medium`}>
            <ProfileNavMenu />

            <div className={styles.contentBlock}>
                <Switch>
                    <Route path="/profile" exact>
                        <ProfileInfo />
                    </Route>

                    <Route path="/profile/orders">
                        <ProfileOrders />
                    </Route>
                </Switch>
            </div>
        </section>
    )
}

export default Profile;
