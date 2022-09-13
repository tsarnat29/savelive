import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes, operRoutes, userRoutes, publicRoutes } from "../routes";
import { ORDER_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  console.log("AppRouter:user.role=", user.role);
  console.log("AppRouter", user);
  console.log("adminRoutes", adminRoutes);
  console.log("publicRoutes=", publicRoutes);

  return (
    <Routes>
      {user.isAuth &&
        user.role === "ADMIN" &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {user.isAuth &&
        user.role === "OPER" &&
        operRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {user.isAuth &&
        user.role === "USER" &&
        userRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate replace to={ORDER_ROUTE} />} />
    </Routes>
  );
});
export default AppRouter;
