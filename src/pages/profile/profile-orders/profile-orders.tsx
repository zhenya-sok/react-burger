import React, { FC } from 'react';
import styles from './profile-orders.module.css';
import OrderList from '../../../components/orders-list/orders-list';

const ProfileOrders: FC = () => {

    return (
        <div>
            <OrderList />
        </div>
    )
}

export default ProfileOrders;
