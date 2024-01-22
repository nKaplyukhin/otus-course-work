import React from 'react';
import { OperationsList } from 'components/Cards';
import { Auth } from 'pages';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

export const Navigation = () => (
  <Routes>
    <Route Component={Auth} path="/auth" />
    <Route
      element={
        <ProtectedRoute>
          <div>profile</div>
        </ProtectedRoute>
      }
      path="/profile"
    />
    <Route path="/" Component={OperationsList} />
  </Routes>
);
