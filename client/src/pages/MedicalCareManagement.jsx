import React from "react";
import { css, styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const MedicalCareManagement = () => {
  return (
    <Container>
      <Header>진료관리</Header>
      <SmallContainer>
        <SmallItem>
          <Label>예약번호</Label>
          <Value>1</Value>
        </SmallItem>
        <SmallItem>
          <Label>병원명</Label>
          <Value>1</Value>
        </SmallItem>
        <SmallItem>
          <Label>진료날짜</Label>
          <Value>1</Value>
        </SmallItem>
        <SmallItem>
          <Label Nothing={true}></Label>
          <Value></Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 성명</Label>
          <Value>1</Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 전화번호</Label>
          <Value>1</Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 성별</Label>
          <Value>1</Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 나이</Label>
          <Value>1</Value>
        </SmallItem>
      </SmallContainer>
      <BigContainer>
        <TopContainer>
          <TopSection>
            <Title>환자의 과거 병력</Title>
            <Content>내용</Content>
          </TopSection>
          <TopSection>
            <Title>환자가 내원한 이유와 환자의 주요 증상</Title>
            <Content>내용</Content>
          </TopSection>
          <TopSection>
            <Title>현재 증상</Title>
            <Content>내용</Content>
          </TopSection>
          <TopSection>
            <Title>치료계획</Title>
            <Content>내용</Content>
          </TopSection>
        </TopContainer>
        <BottomContainer>
          <Title>비고</Title>
          <Content>내용</Content>
        </BottomContainer>
      </BigContainer>
    </Container>
  );
};

export default MedicalCareManagement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  min-width: 950px;
  min-height: 700px;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  margin: 2rem;
`;

const SmallContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const SmallItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #333;
`;

const Label = styled.div`
  flex: 1;
  border-right: 1px solid #333;
  padding: 10px;
  font-weight: 600;

  background-color: ${palette.gray.light};
  ${(props) =>
    props.Nothing &&
    css`
      background-color: #fff;
      border-right: none;
    `}
`;

const Value = styled.div`
  flex: 1;
`;

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  margin-top: 10px;
`;

const TopContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #333;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  border-bottom: 1px solid #333;
  background-color: ${palette.gray.light};
  padding: 10px;
  font-weight: 600;
  width: 100%;
`;

const Content = styled.div`
  flex: 8;
  padding: 10px;
`;

const BottomContainer = styled.div`
  flex: 1;
  border: 1px solid #333;
  min-height: 200px;
  margin-top: 10px;
`;
