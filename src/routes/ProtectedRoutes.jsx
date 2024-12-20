import React, { useContext } from 'react'
import { AppContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { globalData } = useContext(AppContext);


  if (!globalData?.loggedUser) {
    return <Navigate to="/" />;
  }

  const allowedRoles = ['ADMIN', 'SUPERADMIN']
  if (allowedRoles.includes(globalData.loggedUser.rol)) return children
  return <Navigate to="/" />
}

export default ProtectedRoutes