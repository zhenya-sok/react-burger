import React, { FC, ReactNode } from 'react';
import { useSelector } from '../../utils/hooks/hooks';
import { Route, Redirect, useLocation } from 'react-router-dom';

interface IProtectedRouteProps {
    onlyForAuth?: boolean;
    children: ReactNode;
    path: string;
    exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps>  = ({ onlyForAuth, children, ...rest }) => {
    const isAuth = useSelector((state) => !!state.authReducer.token);
    const location = useLocation<{from: { pathname: string }}>();

    if (!onlyForAuth && isAuth) {
        const from = location?.state?.from || { pathname: "/" }

        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        );
    }

    if (onlyForAuth && !isAuth) {
        return (
            <Route {...rest}>
                <Redirect to={{ pathname: "/login", state: { from: location } }} />
            </Route>
        );
    }

    return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
