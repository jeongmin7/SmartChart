import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import { userRoleAtom } from "../stores/userInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { invoiceAtom } from "../stores/invoiceAtom";

const Invoice = ({
  id,
  patientInfo,
  cost,
  prevCost,
  sum,
  patientDetailCost,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [copiedValue, setCopiedValue] = useRecoilState(invoiceAtom);
  const userRole = useRecoilValue(userRoleAtom);
  const copySelectedValue = () => {
    const copiedValue = [...selectedFields];
    setCopiedValue(copiedValue);
  };
  useEffect(copySelectedValue, [selectedFields]);
  const isDoctor = userRole.role === "DOCTOR";
  // const prevTotalCost =
  //   prevCost && prevCost.reduce((acc, current) => acc + current.cost, 0);
  const totalCost = selectedFields.reduce(
    (total, item) => total + parseInt(item.cost),
    0
  );
  const total = totalCost;
  // 옵션에서 선택한 치료내역
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const addInputField = (type, index) => {
    const selectedItem = cost.find((item) => item.treatment === selectedValue);
    if (type === "delete") {
      const newSelectedFields = selectedFields.filter(
        (item, idx) => idx !== index
      );
      setSelectedFields(newSelectedFields);
      return;
    }

    if (selectedItem) {
      setSelectedFields([
        ...selectedFields,
        {
          reservationId: id,
          treatment: selectedValue,
          cost: selectedItem.cost,
        },
      ]);
    }
  };
  // Invoice 컴포넌트 내에 해당 함수 추가
  const getTreatmentOptions = () => {
    // cost 배열에서 treatment 값만 추출하여 unique한 값들을 set으로 생성
    const treatmentOptions = new Set(cost.map((item) => item.treatment));
    // set을 다시 배열로 변환하여 옵션으로 사용할 수 있도록 반환
    return Array.from(treatmentOptions);
  };
  return (
    <Wrapper>
      <SectionHeader>
        <Section>진료비</Section>
      </SectionHeader>
      <GridContainer>
        <GridItem>
          <Title>예약번호</Title>
          <Content>{id}</Content>
        </GridItem>
        <GridItem>
          <Title>병원명</Title>
          <Content>{patientInfo.hospitalName}</Content>
        </GridItem>
        <GridItem>
          <Title>진료날짜</Title>
          <Content>{patientInfo.reservationDate}</Content>
        </GridItem>
        <GridItem>
          <Title>환자성명</Title>
          <Content>{patientInfo.name}</Content>
        </GridItem>
        <GridItem>
          <Title>환자 전화번호</Title>
          <Content>{patientInfo.phoneNumber}</Content>
        </GridItem>
        <GridItem>
          <Title>환자 성별</Title>
          <Content>{patientInfo.gender}</Content>
        </GridItem>
        <GridItem>
          <Title>환자 나이</Title>
          <Content>{patientInfo.age}</Content>
        </GridItem>
        <GridItem></GridItem>
      </GridContainer>
      <SectionHeader>
        <Section>치료 내역서</Section>
      </SectionHeader>
      <GridContainer detail="true">
        {isDoctor ? (
          <>
            {selectedFields.map((field, index) => (
              <GridItem header key={index}>
                {/* 내역 */}
                <StyledInput type="text" title="true">
                  {index + 1 === selectedFields.length && (
                    <ListBox>
                      {/* 옵션 선택하는 부분 */}
                      <PayList
                        value={selectedValue}
                        onChange={handleSelectChange}
                      >
                        <option value="">선택하세요</option>
                        {getTreatmentOptions().map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </PayList>
                      <Button
                        width="80px"
                        height="25px"
                        fontSize="15px"
                        padding="0"
                        borderRadius="10px"
                        onClick={addInputField}
                      >
                        추가
                      </Button>
                    </ListBox>
                  )}
                  <div>{field.treatment}</div>
                  <ListBox className="buttonBox">
                    <Button
                      width="43px"
                      height="25px"
                      fontSize="15px"
                      padding="0"
                      borderRadius="10px"
                      onClick={() => addInputField("delete", index)}
                    >
                      제거
                    </Button>
                  </ListBox>
                </StyledInput>
                <StyledInput type="text">{field.cost}원</StyledInput>
              </GridItem>
            ))}
            {/* {prevCost.map((detail, index) => (
              <GridItem key={index} type="text" title="true" header>
                <StyledInput title="true">{detail.treatment}</StyledInput>
                <StyledInput>{detail.cost}원</StyledInput>
              </GridItem>
            ))} */}
            {/* 닥터면서 추가한  치료가 없을 때  */}
            {isDoctor && selectedFields.length === 0 && (
              <>
                <GridItem header>
                  <StyledInput type="text" title="true">
                    <PayList
                      value={selectedValue}
                      onChange={handleSelectChange}
                    >
                      <option value="">선택하세요</option>
                      {getTreatmentOptions().map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </PayList>
                    <Button
                      width="43px"
                      height="25px"
                      fontSize="15px"
                      padding="0"
                      onClick={addInputField}
                      disabled={!selectedValue}
                    >
                      등록
                    </Button>
                  </StyledInput>
                  <StyledInput type="text" />
                </GridItem>
              </>
            )}
            {selectedFields.length === 0 ? (
              <>
                <GridItem header>
                  <StyledInput type="text" />
                </GridItem>
                <GridItem header>
                  <StyledInput type="text" />
                </GridItem>
                <GridItem header>
                  <StyledInput type="text" />
                </GridItem>
              </>
            ) : null}
            <GridItem className="noBorderBottom" header>
              <Title>총금액</Title>
              {selectedFields.length === 0 ? (
                <Content>0원</Content>
              ) : (
                <Content>{total}</Content>
              )}
            </GridItem>
          </>
        ) : (
          // 환자일 경우
          <div>
            {userRole.role === "PATIENT" &&
              patientDetailCost &&
              patientDetailCost.map(({ treatment, cost }, index) => (
                <GridItem key={index} type="text" title="true" header>
                  <StyledInput title="true">{treatment}</StyledInput>
                  <StyledInput>{cost}원</StyledInput>
                </GridItem>
              ))}
            <GridItem className="noBorderBottom" header>
              <Title>총금액</Title>
              <Content>{sum}원</Content>
            </GridItem>
          </div>
        )}
      </GridContainer>
    </Wrapper>
  );
};
export default Invoice;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: auto;
  border: 2px solid ${palette.primary.black};
  overflow-x: auto;
  max-width: 1500px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.detail ? "none" : "repeat(4, 1fr)"};
  width: 100%;
  margin: 0 auto;
`;
const GridItem = styled.div`
  text-align: center;
  font-size: 18px;
  display: grid;
  font-weight: ${(props) => (props.header ? "700" : "400")};
  grid-template-columns: ${(props) => (props.header ? "6fr 4fr" : "1fr 9fr")};
  padding: 0;
  width: 100%;
  border-bottom: ${(props) =>
    props.header
      ? `2px solid ${palette.primary.black}`
      : `1px solid ${palette.primary.black}`};
  &.noBorderBottom {
    border-bottom: none;
  }
  &.borderTop {
    border-top: 1px solid ${palette.primary.black};
  }
`;
const Section = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.div`
  background-color: #d9d9d9;
  padding: 16px;
  border-right: 1px solid #000;
  font-weight: 600;
  font-size: 20px;
  width: 140px;
  white-space: nowrap;
`;
const Content = styled.div`
  padding: 16px;
  width: 100%;
  font-weight: 600;
  font-size: 20px;
`;
const StyledInput = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => (props.title ? "1px solid #000" : "none")};
  outline: none;
  font-size: 16px;
  background-color: ${(props) => (props.title ? " #d9d9d9" : "#fff")};
  height: 50px;
`;
const PayList = styled.select`
  width: 200px;
  height: 35px;
  margin-right: 10px;
  border: 2px solid ${palette.gray.border};
  border-radius: 5px;
`;
const ListBox = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  align-items: center;
  left: 10px;
  &.buttonBox {
    left: 90%;
  }
`;
const SectionHeader = styled.div`
  font-weight: 700;
  font-size: large;
  width: 100%;
  border-bottom: 2px solid ${palette.primary.black};
`;
