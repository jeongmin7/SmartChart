import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";
import DaumPostcode from "react-daum-postcode";

const SearchHospital = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchKeyword = (event) => {
    setSearchKeyword(event);
  };

  const [openPostcode, setOpenPostcode] = useState(false);

  const searchAddress = {
    // 버튼 클릭 이벤트
    openSearchAddressModal: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
              주소: ${data.address},
              우편번호: ${data.zonecode},
              data: ${JSON.stringify(data)}
          `);
      setOpenPostcode(false);
    },
  };
  // <div>
  //   <button onClick={searchAddress.openSearchAddressModal}>
  //     우편번호 검색
  //   </button>

  //   {openPostcode && (
  //     <DaumPostcode
  //       onComplete={searchAddress.selectAddress} // 값을 선택할 경우 실행되는 이벤트
  //       autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
  //       defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
  //     />
  //   )}
  // </div>

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
          value={searchKeyword}
          onChange={handleSearchKeyword}
          marginBottom="0"
          width="80%"
          height="2rem"
        />
      </Content>
      <Content>
        <ContentName>주소 :</ContentName>
        <ContentInput>
          <Input
            position="relative"
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword}
            onChange={handleSearchKeyword}
            height="2rem"
          />
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword}
            onChange={handleSearchKeyword}
            height="2rem"
          />
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword}
            onChange={handleSearchKeyword}
            height="2rem"
          />
        </ContentInput>
      </Content>
      <Content>
        <ContentName>진료과목 :</ContentName>
        <Input
          name="searchKeyword"
          id="searchKeyword"
          value={searchKeyword}
          onChange={handleSearchKeyword}
          marginBottom="0"
          width="80%"
          height="2rem"
        />
      </Content>
      <Button width="3%" height="1rem">
        검색하기
      </Button>
    </Container>
  );
};

export default SearchHospital;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
