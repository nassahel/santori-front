import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/ContextProvider';

const ProtectedLoginRoutes = ({ children }) => {
    const { userData, loading } = useContext(AppContext);

    useEffect(() => {
        const validateToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token no encontrado');
                return false;
            }
            return true
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!userData) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedLoginRoutes;
