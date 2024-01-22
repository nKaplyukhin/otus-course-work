import React, { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { selectToken } from 'store/tokenSlice';
// import { INavigationState } from './types';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppSelector(selectToken);
  const location = useLocation();

  if (token) return children;

  return <Navigate to="/auth" state={{ from: location }} replace />;
};
