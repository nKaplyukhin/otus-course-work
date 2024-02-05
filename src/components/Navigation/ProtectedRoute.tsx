import { useToken } from 'hooks/useToken';
import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const token = useToken();

  if (token) return children;

  return <Navigate to="/auth" state={{ from: location }} replace />;
};
