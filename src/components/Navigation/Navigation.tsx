import React from 'react';
import { Auth, Main, Profile } from 'pages';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useIsLoginNavigation } from './useIsLoginNavigation';

export const Navigation = () => {
  useIsLoginNavigation();
  return (
    <Routes>
      <Route Component={Auth} path="/auth" />
      <Route
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        path="/profile"
      />
      <Route path="/" Component={Main} />
    </Routes>
  );
};
