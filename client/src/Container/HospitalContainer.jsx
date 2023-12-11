import React, { useEffect, useState } from "react";
import HospitalComponent from "../components/HospitalComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { hospitalAtom } from "../stores/userInfo";

const HospitalContainer = () => {
  const [hospitalInfo, setHospitalInfo] = useRecoilState(hospitalAtom);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get("/doctor/hospital-view", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHospitalInfo(response.data.hospitalPage[0]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;

    setHospitalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.patch("/doctor/hospital", {
        hospitalName: hospitalInfo.hospitalName,
        hospitalPhoneNumber: hospitalInfo.hospitalPhoneNumber,
        hospitalIntroduction: hospitalInfo.hospitalIntroduce,
      });
      setHospitalInfo((prev) => ({ ...prev }));
      toast.success("성공적으로 업데이트 되었습니다.");
    } catch (error) {
      toast.error("에러가 발생하였습니다.");
    }
  };

  return (
    <HospitalComponent
      hospitalInfo={hospitalInfo}
      isLoading={isLoading}
      onChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default HospitalContainer;
