import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";
import { useDaumPostcodePopup } from "react-daum-postcode";

const SearchHospital = () => {
  const [searchKeyword, setSearchKeyword] = useState({
    name: "",
    postalCode: "",
    address: "",
    detailAddress: "",
    medicalSubject: "",
  });

  console.log(searchKeyword, "searchKeyword");

  const handleSearchKeyword = (event) => {
    setSearchKeyword(event);
  };
  const addressModalopen = useDaumPostcodePopup();
  const searchAddress = (data) => {
    console.log(JSON.stringify(data), data.buildingName);

    setSearchKeyword({
      ...searchKeyword,
      name: data.buildingName,
      postalCode: data.zonecode,
      address: data.address,
    });
  };

  const handleClick = () => {
    addressModalopen({ onComplete: searchAddress });
  };

  return (
    <Container>
      <span
        style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "30px" }}
      >
        병원 등록하기
      </span>
      <Content>
        <ContentName>병원 이름 :</ContentName>
        <Input
          name="searchKeyword"
          id="searchKeyword"
          value={searchKeyword.name}
          marginBottom="0"
          width="80%"
          height="2rem"
        />
      </Content>
      <Content>
        <ContentName>주소 :</ContentName>
        <ContentInput>
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword.postalCode}
            height="2rem"
          />
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword.address}
            height="2rem"
          />
          <Input
            name="searchKeyword"
            id="searchKeyword"
            // value={searchKeyword}
            // onChange={handleSearchKeyword}
            height="2rem"
          />
        </ContentInput>
      </Content>
      <Content>
        <ContentName>진료과목 :</ContentName>
        <Input
          name="searchKeyword"
          id="searchKeyword"
          // value={searchKeyword}
          // onChange={handleSearchKeyword}
          marginBottom="0"
          width="80%"
          height="2rem"
        />
      </Content>
      <ButtonWrapper>
        <Button
          width="80px"
          height="20px"
          padding="0"
          fontSize="12px"
          onClick={handleClick}
        >
          주소 검색
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default SearchHospital;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContentName = styled.div`
  display: flex;
  width: 20%;
  align-items: center;
`;

const ContentInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: -95px;
  top: 105px;
`;
