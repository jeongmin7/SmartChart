import React from "react";
import MypageComponent from "../components/MypageComponent";
import DoctorPage from "../components/DoctorPage";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../stores/userInfo";

const MypageContainer = () => {
  // const userInfo = useRecoilValue(userInfoAtom);
  // console.log(userInfo.isDoctor);
  // if (userInfo.isDoctor) {
  //   return <DoctorPage />;
  // }
  return <MypageComponent />;
};

export default MypageContainer;
