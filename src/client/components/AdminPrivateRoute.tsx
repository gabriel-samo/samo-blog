import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

function AdminPrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="sign-in" />
  );
}

export default AdminPrivateRoute;
