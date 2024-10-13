import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth  from '../hooks/useAuth'; 
const ProtectedRoute = ({ element }) => {
    const { authState } = useAuth();
    const { isAuthenticated } = authState;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
