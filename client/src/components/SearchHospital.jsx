import React, { useState } from "react";
import Input from "./Input";
import { styled } from "styled-components";
import Button from "./Button";

const SearchHospital = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchKeyword = (event) => {
    setSearchKeyword(event);
  };
  return (
    <>
      <span>병원 정보 검색하기</span>
      <Wrapper>
        <Content>
          시/도:
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword}
            onChange={handleSearchKeyword}
          />
        </Content>
        <Content>
          구/군:
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword}
            onChange={handleSearchKeyword}
          />
        </Content>
        <Content>
          진료과목:
          <Input
            name="searchKeyword"
            id="searchKeyword"
            value={searchKeyword}
            onChange={handleSearchKeyword}
          />
        </Content>
        <Button width="3%" height="1rem">
          검색하기
        </Button>
      </Wrapper>
    </>
  );
};

export default SearchHospital;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
