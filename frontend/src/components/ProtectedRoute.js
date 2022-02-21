// этим компонентом защищаем роут /, чтобы на него не смогли перейти неавторизованные пользователи
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    
      props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />
    
  );
};

export default ProtectedRoute;