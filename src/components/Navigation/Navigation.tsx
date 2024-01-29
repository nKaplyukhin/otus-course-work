import React from 'react';
import { Auth, Card, Main, Profile } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useIsLoginNavigation } from './useIsLoginNavigation';

export const Navigation = () => {
  useIsLoginNavigation();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route Component={Auth} path="/auth" />
      <Route
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        path="/profile"
      />
      <Route path="/main">
        <Route index Component={Main} />
        <Route path=":id" Component={Card} />
      </Route>
    </Routes>
  );
};
