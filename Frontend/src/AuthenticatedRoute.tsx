import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface AuthenticatedRouteProps {
  path: string;
  element: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  path,
  element,
}: AuthenticatedRouteProps) => {
    const currentUser = useSelector((state: { user: { currentUser: any; }; }) => state.user.currentUser);

  return (
    <Route
      path={path}
      element={currentUser ? element : <Navigate to="/login" replace />}
    />
  );
};

export default AuthenticatedRoute;
