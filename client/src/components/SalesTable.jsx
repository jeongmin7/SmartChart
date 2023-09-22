import React from "react";
import { styled } from "styled-components";

const SalesTable = () => {
  return (
    <Container>
      <Title>매출날짜</Title>
      <Title>환자 수</Title>
      <Title>여성 환자 수 </Title>
      <Title>남성 환자 수 </Title>
      <Title>환자 평균 나이 </Title>
      <Title>총 수입</Title>
    </Container>
  );
};

export default SalesTable;
const Container = styled.div`
  display: grid;
  width: 60%;
  margin-top: 20px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;
const Title = styled.div`
  border: 1px solid black;
`;
