import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes } from "../types/route.types";
import { FormPerson, FormSuccess } from "../pages";

const AppPrivateRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PrivateRoutes?.cerveceria} />} />
      <Route path={PrivateRoutes.cerveceria} element={<FormPerson />} />
      <Route path={PrivateRoutes.successForm} element={<FormSuccess />} />
    </Routes>
  );
};

export default AppPrivateRoute;
