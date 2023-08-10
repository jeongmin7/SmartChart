import React from "react";
import { Routes, Route } from "react-router-dom";
import { path } from "./modules/define/path";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import SelfDiagnosis from "./pages/SelfDiagnosis";
import MapComponent from "./components/MapComponent";
import Appointment from "./pages/Appointment";
import Pay from "./pages/Pay";
import MyPage from "./pages/MyPage";
import Chat from "./pages/Chat";
import HospitalPage from "./pages/HospitalPage";

const RoutesCollection = () => {
  return (
    <Routes>
      <Route path={path.home} element={<Login />} />
      <Route path={path.signUp} element={<SignUp />} />
      <Route path={path.selfDiagnosis} element={<SelfDiagnosis />} />
      <Route path={path.map} element={<MapComponent />} />
      <Route path={path.appointment} element={<Appointment />} />
      <Route path={path.pay} element={<Pay />} />
      <Route path={path.mypage} element={<MyPage />} />
      <Route path={path.chat} element={<Chat />} />
      <Route path={path.hospitalPage} element={<HospitalPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesCollection;
