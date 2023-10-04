import React, { useState } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import { useNavigate } from "react-router-dom";

const myInfo = [
  {
    name: "홍유",
    phoneNumber: 1012341234,
    gender: "여자",
    age: 31,
  },
];

const reservationList = [
  {
    id: 39,
    hospitalName: "연세에스웰 피부과",
    reservationTime: "17:00:00",
    reservationDate: "2023-08-09",
    reservationStatus: "미완료",
  },
  {
    id: 40,
    hospitalName: "연세에스웰 피부과2",
    reservationTime: "17:00:00",
    reservationDate: "2013-08-09",
    reservationStatus: "미완료",
  },
  {
    id: 41,
    hospitalName: "연세에스웰 피부과3",
    reservationTime: "13:00:00",
    reservationDate: "2013-08-09",
    reservationStatus: "미완료",
  },
];
const MypageComponent = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: myInfo[0].name,
    phoneNumber: myInfo[0].phoneNumber,
    gender: myInfo[0].gender,
    age: myInfo[0].age,
  });

  const columns = [
    { name: "", width: "5%" },
    { name: "병원명", width: "15%" },
    { name: "예약 날짜", width: "25%" },
    { name: "예약 시간", width: "12%" },
    { name: "예약 상태", width: "10%" },
    { name: "", width: "10%" },
    { name: "", width: "23%" },
  ];

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <MypageContainer>
      <MypageWrapper>
        <Header>마이페이지</Header>
        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <InfoValue
                type="text"
                value={userInfo.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              <select defaultValue={myInfo[0].gender} disabled>
                <option value="">성별</option>
                <option value="남자">남성</option>
                <option value="여자">여성</option>
              </select>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <InfoValue value={myInfo[0].age} readOnly />
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue
                type="text"
                value={userInfo.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </FirstColumnHalfWrapper>
        {/* //! 예약리스트 border 겹치는 것 해결하고 다시 수정 */}
        <ColumnHalfWrapper>
          <Header>예약리스트</Header>
          <AppointmentListTitle>
            {columns.map((column, index) => (
              <ListRowDivideWrapper
                width={column.width}
                index={index}
                key={index}
              >
                {column.name}
              </ListRowDivideWrapper>
            ))}
          </AppointmentListTitle>
          <AppointmentListBody>
            {reservationList.map((item, index) => (
              <ListWrapper key={index}>
                <div style={{ width: "5%" }}>{item.id}</div>
                <div style={{ width: "15%" }}>{item.hospitalName}</div>
                <div style={{ width: "25%" }}>{item.reservationDate}</div>
                <div style={{ width: "12%" }}>{item.reservationTime}</div>
                <div style={{ width: "10%" }}>{item.reservationStatus}</div>
                <ButtonContainer>
                  <Button
                    width="70%"
                    height="60%"
                    padding="5px"
                    fontSize="15px"
                    borderRadius="10px"
                  >
                    예약 취소
                  </Button>
                </ButtonContainer>
                <ButtonContainer width="23%">
                  <Button
                    width="70%"
                    height="50%"
                    padding="5px"
                    fontSize="15px"
                    borderRadius="10px"
                    onClick={() => navigate("/selfdiagnosis")}
                  >
                    기본 건강체크하러 가기
                  </Button>
                </ButtonContainer>
              </ListWrapper>
            ))}
          </AppointmentListBody>
        </ColumnHalfWrapper>
        <Button width="100px" height="100px" padding="10px" fontSize="15px">
          Update
        </Button>
      </MypageWrapper>
    </MypageContainer>
  );
};

export default MypageComponent;

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
  height: 100%;
`;
const AppointmentListTitle = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  background-color: ${palette.gray.light};
  border-top: 1px solid ${palette.gray.border};
  border-bottom: 1px solid ${palette.gray.border};
`;
const AppointmentListBody = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  flex-direction: column;
  margin-bottom: 80px;
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
`;

const ListRowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    (props.index === 0 || props.index === 5 || props.index === 6) && "center"};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  border-left: ${(props) =>
    props.index !== 0 && `1px solid ${palette.gray.border}`};
  padding-left: ${(props) =>
    props.index !== 0 && props.index !== 5 && props.index !== 6 && "10px"};
  background-color: ${(props) =>
    props.index === 0 ? palette.gray.light : "transparent"};
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.input`
  width: 60%;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${palette.gray.border};
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  width: ${(props) => props.width || "10%"};
  display: flex;
  justify-content: center;
  white-space: nowrap;
`;
