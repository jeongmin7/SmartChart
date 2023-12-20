import React, { useEffect, useState } from "react";
import { css, styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";

const MedicalCareManagement = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [patientInfo, setPatientInfo] = useState({});
  const [medicalNote, setMedicalNote] = useState({
    medicalHistory: "",
    mainSymptoms: "",
    currentSymptoms: "",
    treatmentPlan: "",
    note: "",
  });
  const [receivedNote, setReceivedNote] = useState({});
  const onChange = (event) => {
    const { name, value } = event.target;

    setMedicalNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post("/doctor/treatment", {
          reservationId: id,
          medicalHistory: medicalNote.medicalHistory,
          mainSymptoms: medicalNote.mainSymptoms,
          currentSymptoms: medicalNote.currentSymptoms,
          treatmentPlan: medicalNote.treatmentPlan,
          note: medicalNote.note,
        })
        .then((res) => toast.success("저장되었습니다."))
        .then(navigate("/adminAppointment"));
    } catch (error) {
      toast.error("실패하였습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/doctor/treatment-view/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setPatientInfo(response.data.data[0]);
        setReceivedNote(response.data.data2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Header>진료관리</Header>
      <SmallContainer>
        <SmallItem>
          <Label>예약번호</Label>

          <Value>{id}</Value>
        </SmallItem>
        <SmallItem>
          <Label>병원명</Label>
          <Value>{patientInfo.hospitalName}</Value>
        </SmallItem>
        <SmallItem>
          <Label>진료날짜</Label>
          <Value>{patientInfo.reservationDate}</Value>
        </SmallItem>
        <SmallItem>
          <Label Nothing={true}></Label>
          <Value></Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 성명</Label>
          <Value>{patientInfo.name}</Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 전화번호</Label>
          <Value>{patientInfo.phoneNumber}</Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 성별</Label>
          <Value>{patientInfo.gender}</Value>
        </SmallItem>
        <SmallItem>
          <Label>환자 나이</Label>
          <Value>{patientInfo.age}</Value>
        </SmallItem>
      </SmallContainer>

      <BigContainer>
        <TopContainer>
          <TopSection>
            <Title>환자의 과거 병력</Title>
            <Content>
              <TextArea
                name="medicalHistory"
                onChange={onChange}
                value={receivedNote[0]?.medicalHistory || ""}
              />
            </Content>
          </TopSection>
          <TopSection>
            <Title>환자가 내원한 이유와 환자의 주요 증상</Title>
            <Content>
              <TextArea
                name="mainSymptoms"
                onChange={onChange}
                value={receivedNote[0]?.mainSymptoms || ""}
              />
            </Content>
          </TopSection>
          <TopSection>
            <Title>현재 증상</Title>
            <Content>
              <TextArea
                name="currentSymptoms"
                onChange={onChange}
                value={receivedNote[0]?.currentSymptoms || ""}
              />
            </Content>
          </TopSection>
          <TopSection>
            <Title>치료계획</Title>
            <Content>
              <TextArea
                name="treatmentPlan"
                onChange={onChange}
                value={receivedNote[0]?.treatmentPlan || ""}
              />
            </Content>
          </TopSection>
        </TopContainer>
        <BottomContainer>
          <Title>비고</Title>
          <Content>
            <TextArea
              name="note"
              onChange={onChange}
              value={medicalNote?.note || ""}
            />
          </Content>
        </BottomContainer>
      </BigContainer>
      <Button
        width="80px"
        height="40px"
        padding="10px"
        fontSize="15px"
        borderRadius="10px"
        onClick={handleSubmit}
      >
        저장
      </Button>
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
  margin-bottom: 10px;
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
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
`;
