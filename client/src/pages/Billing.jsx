import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const Billing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const data = [
    {
      treatment: "CT진단비",
      cost: "10000",
    },
    { treatment: "마취비", cost: "1000" },
    { treatment: "입원비", cost: "100" },
    { treatment: "주사비", cost: "10" },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const totalCost = selectedFields.reduce(
    (total, item) => total + parseInt(item.cost),
    0,
  );
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const addInputField = () => {
    const treatmentCost = data.find(
      (item) => item.treatment === selectedValue,
    ).cost;
    setSelectedFields([
      ...selectedFields,
      { treatment: selectedValue, cost: treatmentCost },
    ]);
  };
  return (
    <Container>
      <Header>의료비 청구</Header>
      <Wrapper>
        <div>
          <GridItem header="true">
            <Section>진료비</Section>
          </GridItem>

          <GridContainer>
            <GridItem>
              <Title>예약번호</Title>
              <Content>{id}</Content>
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
              <Content>{}</Content>
            </GridItem>
            <GridItem>
              <Title>환자 번호</Title>
              <Content>test</Content>
            </GridItem>
            <GridItem>
              <Title>환자 성별</Title>
              <Content>test</Content>
            </GridItem>
            <GridItem>
              <Title>환자 나이</Title>
              <Content>test</Content>
            </GridItem>
            <GridItem>
              <Title>111</Title>
              <Content>test</Content>
            </GridItem>
          </GridContainer>
          <GridItem header="true">
            <Section>
              치료 내역서
              <select value={selectedValue} onChange={handleSelectChange}>
                <option value="">선택하세요</option>
                <option value="CT진단비">CT진단비</option>
                <option value="마취비">마취비</option>
                <option value="입원비">입원비</option>
                <option value="주사비">주사비</option>
              </select>
              <button onClick={addInputField}>추가</button>
            </Section>
          </GridItem>
          <GridContainer detail="true">
            {selectedFields.map((field, index) => (
              <GridItem key={index}>
                <StyledInput type="text" title="true">
                  {field.treatment}
                </StyledInput>
                <StyledInput type="text">{field.cost}</StyledInput>
              </GridItem>
            ))}
            <GridItem>
              <Title>총금액</Title>
              <Content>{totalCost}</Content>
            </GridItem>
          </GridContainer>
        </div>
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
    props.detail ? "none" : "repeat(4, 1fr)"};
  width: 100%;
  /* max-width: 800px; */
  margin: 0 auto;
`;
const GridItem = styled.div`
  text-align: center;
  font-size: 18px;
  display: grid;
  font-weight: ${(props) => (props.header ? "700" : "400")};
  grid-template-columns: ${(props) => (props.header ? "" : "6fr 4fr")};
  padding: 0;
  width: 100%;
  border-bottom: ${(props) =>
    props.header
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
