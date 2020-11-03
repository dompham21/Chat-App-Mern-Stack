import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRouter = ({component: Component, restricted, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            localStorage.getItem('token') && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRouter;