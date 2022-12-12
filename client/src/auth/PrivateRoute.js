import React from 'react';
import { Navigate } from 'react-router';
import { Route } from 'react-router-dom';
import { useUser } from './useUser';

function PrivateRoute(props) {
    
  const user = useUser();
  console.log(user);
  if (!user) return <Navigate to="/login" replace />;
  return props.children;
}

export default PrivateRoute

