import React, { Suspense, useState } from "react";
import { styled } from "styled-components";
import Loader from "../components/Loader";
import Maps from "../components/Maps";
import { Container, Wrapper } from "../styles/CommonStyle";

const MakeAppointmentComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Suspense fallback={<Loader />}>
      <Container>
        {isLoading && <Loader />}
        <Wrapper>
          <Header>병원 검색하기</Header>
          <Maps setIsLoading={setIsLoading} />
        </Wrapper>
      </Container>
    </Suspense>
  );
};

export default MakeAppointmentComponent;
const Header = styled.div`
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
