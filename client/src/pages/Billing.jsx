import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const Billing = () => {
  const { state } = useLocation();

  return (
    <Container>
      <Header>의료비 청구</Header>
      <Wrapper>
        <GridItem Header={true}>
          <Section>진료비</Section>
        </GridItem>
        <GridContainer>
          <GridItem>
            <Title>예약번호</Title>
            <Content>{state.id}</Content>
          </GridItem>
          <GridItem>
            <Title>병원명</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem>
            <Title>진료날짜</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem>
            <Title>환자 성명</Title>
            <Content>{state.username}</Content>
          </GridItem>
          <GridItem className="noneBorderLeft secondRow">
            <Title>환자 번호</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem className="secondRow">
            <Title>환자 성별</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem className="secondRow">
            <Title>환자 나이</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem className="secondRow">
            <Title>111</Title>
            <Content>test</Content>
          </GridItem>
        </GridContainer>
        <GridItem Header className="noneBorderLeft">
          <Section>치료 내역서</Section>
        </GridItem>
        <GridContainer detail>
          <GridItem>
            <Title>111</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem className="noneBorderLeft">
            <Title>111</Title>
            <Content>test</Content>
          </GridItem>
          <GridItem className="noneBorderLeft">
            <Title>총금액</Title>
            <Content>test</Content>
          </GridItem>
        </GridContainer>
      </Wrapper>
    </Container>
  );
};

export default Billing;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  min-height: calc(100vh - 100px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1500px;
  border: 2px solid ${palette.primary.black};
`;
const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.detail ? "none" : "repeat(4, 1fr)"}; // 4개의 열
  width: 100%;
  /* max-width: 800px; */
  margin: 0 auto;
`;
const GridItem = styled.div`
  text-align: center;
  font-size: 18px;
  display: grid;
  font-weight: ${(props) => (props.Header ? "700" : "400")};
  grid-template-columns: ${(props) => (props.Header ? "" : "6fr 4fr")};
  padding: 0;
  width: 100%;
  border-bottom: ${(props) =>
    props.Header
      ? `2px solid ${palette.primary.black}`
      : `1px solid ${palette.primary.black}`};
  &:not(:first-child) {
    border-left: 1px solid ${palette.primary.black};
  }
  &.noneBorderLeft {
    border-left: none;
  }
  &.secondRow {
    border-bottom: 2px solid ${palette.primary.black};
  }
`;
const Section = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  background-color: #d9d9d9;
  padding: 16px;
  border-right: 1px solid #000;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 16px;
  width: 100%;
`;
const StyledInput = styled.div`
  border: none;
  outline: none;
  font-size: 20px;
  background-color: ${(props) => (props.title ? " #d9d9d9" : "#fff")};
  padding: 16px;
`;
