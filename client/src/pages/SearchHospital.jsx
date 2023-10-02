import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Loader from "../components/Loader";

const SearchHospital = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Container>
      {isLoading && <Loader />}
      <Wrapper>
        <Header>병원 검색하기</Header>
        <MapComponent setIsLoading={setIsLoading} />
      </Wrapper>
    </Container>
  );
};

export default SearchHospital;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  min-width: 950px;
  min-height: 800px;
  padding-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 80%;
  min-width: 950px;
  min-height: 800px;
  padding: 40px 10px 10px 10px;

  border: 1px solid ${palette.gray.border};
  border-radius: 20px;
  /* div + div {
    margin-top: 20px;
  } */
`;

const Header = styled.div`
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
