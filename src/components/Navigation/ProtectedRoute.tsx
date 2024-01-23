import React, { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const token = false;
export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  if (token) return children;

  return <Navigate to="/auth" state={{ from: location }} replace />;
};
