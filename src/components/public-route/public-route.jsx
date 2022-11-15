import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ redirectTo, ...props}) => {
    const isAuth = useSelector((state) => !!state.authReducer.token);

    if (!isAuth) {
        return <Route {...props} />
    } else {
        return <Redirect to={redirectTo} />
    }
}

export default PublicRoute;
