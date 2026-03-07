// src/Routes/PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector(state => state.user);

  console.log("PrivateRoute revisando user:", user);

  if (!user) {
    console.warn("No hay usuario logueado, redirigiendo a login...");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // <-- esto renderiza la ruta hija
};

export default PrivateRoute;