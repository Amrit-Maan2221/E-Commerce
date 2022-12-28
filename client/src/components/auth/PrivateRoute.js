import React from 'react';
import { Navigate } from 'react-router';
import { useUser } from '../../custom hooks/useUser';

function PrivateRoute(props) {
    
  const user = useUser();
  console.log(user);
  if (!user) return <Navigate to="/login" replace />;
  return props.children;
}

export default PrivateRoute

