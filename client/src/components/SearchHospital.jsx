import React, { useState } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { hospitalAtom } from "../stores/userInfo";
import Button from "./Button";
import axios from "axios";
import { palette } from "../styles/GlobalStyles";
import { toast } from "react-toastify";
import Input from "./Input";

const SearchHospital = () => {
  const [hospitalInfo, setHospitalInfo] = useRecoilState(hospitalAtom);
  const [selectedHospitalInfo, setSelectedHospitalInfo] = useState(null);

  const handleSelectHospital = (selectedHospital) => {
    setHospitalInfo((prevHospitalInfo) => ({
      ...prevHospitalInfo,
      name: selectedHospital.title.replace(/<\/?b>/g, ""),
      address: selectedHospital.address,
      tel: selectedHospital.telephone,
      mapy: parseInt(selectedHospital.mapy),
      mapx: parseInt(selectedHospital.mapx),
      category: selectedHospital.category.split(">")[1].trim(),
    }));
    setSelectedHospitalInfo(selectedHospital);
  };

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "/doctor/naver",
        { query: query },
        { headers: { "Content-Type": "application/json" } }
      );

      setData(response.data.items);
    } catch (err) {
      toast.error("검색할 수 없습니다.");
    }
  };

  return (
    <>
      <div style={{ fontWeight: "500" }}>병원 등록하기</div>
      <InputWithButton>
        <Section>
          <DoctorInput type="text" onChange={onChange} />
          <Button
            width="50px"
            height="30px"
            onClick={handleSearch}
            whiteSpace="noWrap"
            borderRadius="7px"
          >
            검색
          </Button>
        </Section>
      </InputWithButton>
      {data.map((hospital, index) => (
        <HospitalItem
          key={index}
          isSelected={selectedHospitalInfo === hospital}
        >
          <HospitalName>{hospital.title.replace(/<\/?b>/g, "")}</HospitalName>
          <HospitalInfo>
            진료과:{hospital.category.split(">")[1].trim()}
          </HospitalInfo>
          <HospitalInfo>주소: {hospital.address}</HospitalInfo>
          <Button
            width="60px"
            fontSize="12px"
            padding="10px"
            borderRadius="8px"
            onClick={() => handleSelectHospital(hospital)}
          >
            선택
          </Button>
        </HospitalItem>
      ))}
    </>
  );
};

export default SearchHospital;

const DoctorInput = styled.input`
  height: 2.5rem;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  max-width: 680px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;
const HospitalItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border: ${(props) =>
    props.isSelected ? `4px solid ${palette.primary.blue}` : "1px solid #ccc"};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  min-height: 150px;
  justify-content: space-between;
`;
const HospitalName = styled.div`
  font-weight: 600;
  font-size: 30px;
`;
const HospitalInfo = styled.div`
  font-size: 16px;
`;
const InputWithButton = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 10px;
`;
