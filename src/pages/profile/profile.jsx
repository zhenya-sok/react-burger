import React from 'react';
import styles from './profile.module.css';
import { Switch, Route } from 'react-router-dom';
import ProfileNavMenu from './profile-nav-menu/profile-nav-menu';
import ProfileInfo from '../profile/profile-info/profile-info';
import OrderFeed from '../profile/order-feed/order-feed';

const Profile = () => {

    return (
        <section className={`${styles.profileWrapper} text text_type_main-medium`}>
            <ProfileNavMenu />

            <div className={styles.contentBlock}>
                <Switch>
                    <Route path="/profile" exact>
                        <ProfileInfo />
                    </Route>

                    <Route path="/profile/order" exact>
                        <OrderFeed />
                    </Route>
                </Switch>
            </div>
        </section>
    )
}

export default Profile;
