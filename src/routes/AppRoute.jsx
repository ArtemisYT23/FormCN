import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../types/route.types";
import { ValidationUser } from "../pages";
import { AppPrivateRoute } from "../routes";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PublicRoutes.cnForm} />} />
      <Route path={PublicRoutes.cnForm} element={<ValidationUser />} />

      <Route
        path={`${PrivateRoutes.authenticated}/*`}
        element={<AppPrivateRoute />}
      />
    </Routes>
  );
};

export default AppRoute;
