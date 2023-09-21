import React from "react";
import { styled } from "styled-components";

const MedicalCareManagement = () => {
  return (
    <Container>
      <h3>진료관리</h3>
      <SmallContainer>
        <SmallItem>
          <STitle>예약번호</STitle>
          <SContent>1</SContent>
        </SmallItem>
        <SmallItem>
          <STitle>병원명</STitle>
          <SContent>1</SContent>
        </SmallItem>
        <SmallItem>
          <STitle>진료날짜</STitle>
          <SContent>1</SContent>
        </SmallItem>
        <SmallItem>
          <STitle></STitle>
          <SContent></SContent>
        </SmallItem>
        <SmallItem>
          <STitle>환자 성명</STitle>
          <SContent>1</SContent>
        </SmallItem>
        <SmallItem>
          <STitle>환자 전화번호</STitle>
          <SContent>1</SContent>
        </SmallItem>
        <SmallItem>
          <STitle>환자 성별</STitle>
          <SContent>1</SContent>
        </SmallItem>
        <SmallItem>
          <STitle>환자 나이</STitle>
          <SContent>1</SContent>
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
        <BottomContainer>비고</BottomContainer>
      </BigContainer>
    </Container>
  );
};

export default MedicalCareManagement;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const SmallContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 10px;
  outline: 1px solid #333;
`;
const SmallItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px;
  outline: 0.5px solid #333;
  line-height: 2;
`;
const STitle = styled.div`
  background-color: pink;
  width: 100%;
  flex: 1;
  border-right: 1px solid #333;
`;
const SContent = styled.div`
  flex: 1;
`;
const BigContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
`;

const TopContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100px;
  outline: 0.5px solid #333;
`;
const Title = styled.div`
  flex: 2;
  outline: 1px solid #333;
`;
const Content = styled.div`
  flex: 8;
`;
const BottomContainer = styled.div`
  flex: 1;
  outline: 1px solid #333;
  min-height: 200px;
`;
