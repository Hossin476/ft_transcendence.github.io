import { Navigate, Route, Outlet } from 'react-router-dom';
import React from 'react';
import  { useAuth } from '../context/AuthContext';

function PrivateRoute() {
    let { user, tokens } = useAuth();

    return tokens
        ? <Outlet/>
        : <Navigate to="/login" replace />;
}

export default PrivateRoute;