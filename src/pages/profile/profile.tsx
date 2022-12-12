import React, { FC } from 'react';
import styles from './profile.module.css';
import { Switch, Route } from 'react-router-dom';
import ProfileNavMenu from './profile-nav-menu/profile-nav-menu';
import ProfileInfo from './profile-info/profile-info';
import ProfileOrders from '../profile/profile-orders/profile-orders';
import PersonalOrdersFeedModal from '../../components/personal-orders-feed-modal/personal-orders-feed-modal';

const Profile: FC = () => {

    return (
        <main className={`${styles.profileWrapper} text text_type_main-medium`}>

                <Switch>
                    <Route path="/profile" exact>
                        <ProfileNavMenu />
                        <ProfileInfo />
                    </Route>

                    <Route path="/profile/orders" exact>
                        <ProfileNavMenu />
                        <ProfileOrders />
                    </Route>

                    <Route path="/profile/orders/:id">
                        <div className={styles.profile__OrderFeedItem}>
                            <PersonalOrdersFeedModal />
                        </div>
                    </Route>
                </Switch>
        </main>
    )
}

export default Profile;
