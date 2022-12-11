import React from 'react'
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute() {
    
  const user = null;
  if (!user) return <Redirect to="/login" />
  return (
    <Route {...props} />
  )
}

export default PrivateRoute