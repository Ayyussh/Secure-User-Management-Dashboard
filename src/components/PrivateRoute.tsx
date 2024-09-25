import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <Component /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
