import React, { useState } from "react";
import { styled } from "styled-components";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Form, Label, Section } from "../styles/CommonStyle";
import { useRecoilState } from "recoil";
import { hospitalAtom } from "../stores/userInfo";
import Button from "./Button";
import instance from "./api";

const SearchHospital = () => {
  // const [hospitalInfo, setHospitalInfo] = useState("");

  // const onChange = (e) => {
  //   const {
  //     target: { name, value },
  //   } = e;
  //   setHospitalInfo((prevUserInfo) => ({
  //     ...prevUserInfo,
  //     [name]: value,
  //   }));
  // };
  // const addressModalopen = useDaumPostcodePopup();

  // const removeDecimal = (number) => {
  //   return number.toString().replace(/\./g, "");
  // };
  // const searchAddress = (data) => {
  //   const geocoder = new window.kakao.maps.services.Geocoder();
  //   geocoder.addressSearch(data.address, function (results, status) {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       const result = results[0];
  //       const coords = new window.kakao.maps.LatLng(result.y, result.x);
  //       setHospitalInfo((prev) => ({
  //         ...prev,
  //         mapx: removeDecimal(coords.Ma),
  //         mapy: removeDecimal(coords.La),
  //       }));
  //     }
  //   });

  //   setHospitalInfo((prev) => ({
  //     ...prev,
  //     buildingName: data.buildingName,
  //     postalCode: data.zonecode,
  //     address: data.address,
  //   }));
  // };

  // const handleClick = () => {
  //   addressModalopen({ onComplete: searchAddress });
  // };

  const [hospitalData, setHospitalData] = useState([]);
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    try {
      instance
        .post(
          "/api/naver",
          { query: query },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => console.log(response));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Form>
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          병원 등록하기
        </div>
        <Section>
          <DoctorInput type="text" onChange={onChange} />
          <Button onClick={handleSearch}>검색하기</Button>
        </Section>
        {/* <Label htmlFor="name">병원 이름 </Label>
          <DoctorInput name="name" id="name" onChange={onChange} />
        </Section>
        <Section>
          <Label>병원 주소</Label>
         */}

        {/* <DoctorInput
            name="postalCode"
            id="postalCode"
            value={hospitalInfo.postalCode}
            onClick={handleClick}
            required
          />

          <DoctorInput
            name="address"
            id="address"
            value={hospitalInfo.address}
            onClick={handleClick}
            required
          />
          <DoctorInput
            name="detailAddress"
            id="detailAddress"
            onChange={onChange}
          /> */}
        {/* </Section>
        <Section>
          <Label htmlFor="tel">병원 전화번호 </Label>
          <DoctorInput name="tel" id="tel" onChange={onChange} />
        </Section>
        <Section>
          <Label>진료과목</Label>

          <DoctorInput name="specialty" id="specialty" onChange={onChange} />
        </Section> */}
      </Form>
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
  width: 96%;
  max-width: 680px;
  margin-bottom: 5px;
`;
