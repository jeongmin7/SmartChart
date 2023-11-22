import React, { useEffect, useState } from "react";
import Map from "./Map";
import Markers from "./Markers";
import instance from "./api";
import styled from "styled-components";
import InfoBox from "./InfoBox";
import axios from "axios";

const Maps = ({ setIsLoading }) => {
  const [map, setMap] = useState(null);
  // 선택한 병원
  const [currentHospital, setCurrentHospital] = useState(null);
  const [hospitals, setHospitals] = useState({});
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // 지도에서 병원 진료과별로 선택하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/patient/reservation-map-view/");

        setHospitals(response.data);
      } catch (error) {
        // 에러 처리
      }
    };

    fetchData();
  }, []);
  const filteredHospitals = selectedSpecialty
    ? hospitals[selectedSpecialty]
    : Object.values(hospitals).flat();
  return (
    <>
      <Options>
        <Option>
          <input
            type="radio"
            value=""
            checked={selectedSpecialty === ""}
            onChange={() => setSelectedSpecialty("")}
          />
          전체
        </Option>
        <Option>
          <input
            type="radio"
            value="내과"
            checked={selectedSpecialty === "내과"}
            onChange={() => {
              setSelectedSpecialty("내과");
            }}
          />
          내과
        </Option>
        <Option>
          <input
            type="radio"
            value="피부과"
            checked={selectedSpecialty === "피부과"}
            onChange={() => setSelectedSpecialty("피부과")}
          />
          피부과
        </Option>
        <Option>
          <input
            type="radio"
            value="안과"
            checked={selectedSpecialty === "안과"}
            onChange={() => setSelectedSpecialty("안과")}
          />
          안과
        </Option>
        <Option>
          <input
            type="radio"
            value="이비인후과"
            checked={selectedSpecialty === "이비인후과"}
            onChange={() => setSelectedSpecialty("이비인후과")}
          />
          이비인후과
        </Option>
        <Option>
          <input
            type="radio"
            value="치과"
            checked={selectedSpecialty === "치과"}
            onChange={() => setSelectedSpecialty("치과")}
          />
          치과
        </Option>
      </Options>
      <Map setMap={setMap} setIsLoading={setIsLoading} />
      <Markers
        map={map}
        setCurrentHospital={setCurrentHospital}
        filteredHospitals={filteredHospitals}
      />
      <InfoBox hospital={currentHospital} setHospital={setHospitals} />
    </>
  );
};

export default Maps;
const Options = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0rem 1.5rem 1.5rem;
  justify-content: space-between;
  width: 100%;
`;

const Option = styled.label`
  display: flex;
`;
