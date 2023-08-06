import React from "react";
import { Routes, Route } from "react-router-dom";
import { path } from "./modules/define/path";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import SelfDiagnosis from "./pages/SelfDiagnosis";

const RoutesCollection = () => {
  return (
    <Routes>
      <Route path={path.home} element={<Login />} />
      <Route path={path.signUp} element={<SignUp />} />
      <Route path={path.selfDiagnosis} element={<SelfDiagnosis />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesCollection;
