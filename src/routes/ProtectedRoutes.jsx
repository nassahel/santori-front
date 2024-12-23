import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { userData, loading } = useContext(AppContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <Navigate to="/" />;
  }

  const allowedRoles = ['ADMIN', 'SUPERADMIN'];
  if (allowedRoles.includes(userData.rol)) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoutes;
