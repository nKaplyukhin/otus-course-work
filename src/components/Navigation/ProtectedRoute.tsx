import React, { FC, PropsWithChildren } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
// import { INavigationState } from './types';
// import { RootState } from 'store';

const token = true;
export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  // const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  const location = useLocation();
  if (token) return children;

  return <Navigate to="/auth" state={{ from: location }} replace />;
};
