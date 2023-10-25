import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isCustomerAuthenticated = useSelector(
    (state) => state?.customers?.isAuthenticated
  );
  const isRestaurantAuthenticated = useSelector(
    (state) => state?.restaurants?.isAuthenticated
  );

  if (isCustomerAuthenticated || isRestaurantAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
