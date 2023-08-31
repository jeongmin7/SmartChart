import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../stores/userInfo";
import { styled } from "styled-components";
import Button from "./Button";
import SelectData from "./SelectData";
import { palette } from "../styles/GlobalStyles";

const MypageComponent = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const columns = ["", "병원명", "예약 날짜", "예약시간", "예약 상태", "취소"];
  const gender = ["남자", "여자"];
  const appointmentInfo = [
    {
      n: 1,
      hospitalName: "차앤박",
      date: "2023-10-20",
      time: "17:00",
      status: "확정",
      cancel: "false",
    },
  ];

  return (
    <MypageContainer>
      <MypageWrapper>
        <Header>마이페이지</Header>
        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <InfoValue value={"test"} />
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              <SelectData availableOption={gender} />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <InfoValue value={"test"} />
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue value={"test"} />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </FirstColumnHalfWrapper>
        {/* //! 예약리스트 border 겹치는 것 해결하고 다시 수정 */}
        <ColumnHalfWrapper>
          <Header>예약리스트</Header>

          <ColumnDivideWrapper>
            {columns.map((column) => (
              <ListRowDivideWrapper>{column}</ListRowDivideWrapper>
            ))}
            {/* <RowDivideWrapper>
              <Button width="100px" height="30px" padding="0" fontSize="12px">
                예약 가능 조회
              </Button>
            </RowDivideWrapper> */}
          </ColumnDivideWrapper>
        </ColumnHalfWrapper>
        <Button width="100px" height="100px" padding="0" fontSize="15px">
          SAVE
        </Button>
      </MypageWrapper>
    </MypageContainer>
  );
};

export default MypageComponent;
const Table = styled.table`
  border: 1px solid gray;
  border-collapse: collapse;
  width: 80%;
`;
const Thead = styled.thead`
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid gray;
`;
const Th = styled.th`
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  &:first-child {
    background-color: #fff;
  }
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;

const MypageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
  width: 100vw;
  height: calc(100vh - 100px);
  min-width: 950px;
  min-height: 800px;
`;

const MypageWrapper = styled.div`
  /* background-color: green; */
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 80%;
  min-width: 950px;
  min-height: 800px;
  border: 1px solid ${palette.gray.border};
  border-radius: 20px;
  padding: 100px 0;

  /* div + div {
    margin-top: 20px;
  } */
`;

const Header = styled.div`
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
  width: 100%;
  text-align: center;
`;

const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  /* background-color: purple; */
`;

const FirstColumnHalfWrapper = styled(ColumnHalfWrapper)`
  padding: 100px 200px 100px;
`;

const RowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  /* background-color: purple; */
`;

const ListRowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  border: 1px solid ${palette.gray.border};

  /* background-color: purple; */
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.input`
  width: 60%;
`;
