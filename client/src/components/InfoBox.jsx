import React from "react";
import styled from "styled-components";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const InfoBox = ({ hospital, setHospital }) => {
  const navigate = useNavigate();
  const handleButtonClick = (id) => {
    navigate(`/appointment/${id}`);
  };
  return (
    <StyledInfoBox>
      {hospital !== null && (
        <>
          <Content>
            <Info>
              <HospitalName>{hospital.hospitalName}</HospitalName>
              <StyledInfo>
                <HiOutlineMapPin />
                {hospital.hospitalAddress}
              </StyledInfo>
              <StyledInfo>
                <AiOutlinePhone />
                {hospital.hospitalPhoneNumber}
              </StyledInfo>
              <StyledInfo>
                <AiOutlineInfoCircle />
                {hospital.category}
              </StyledInfo>
              {hospital.hospitalIntroduce && (
                <StyledInfo>
                  <AiOutlineCheck />
                  {hospital.hospitalIntroduce}
                </StyledInfo>
              )}
              <ReservationButton onClick={() => handleButtonClick(hospital.id)}>
                예약하기
              </ReservationButton>
            </Info>
            <Button type="button" onClick={() => setHospital(null)}>
              <AiOutlineClose />
            </Button>
          </Content>
        </>
      )}
    </StyledInfoBox>
  );
};

export default InfoBox;
const StyledInfoBox = styled.div`
  position: fixed;
  transition: ease-in-out 150ms;
  margin: auto;
  bottom: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  background-color: white;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;
const HospitalName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const StyledInfo = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const ReservationButton = styled.button`
  background-color: #1798e1;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-weight: 600;
  margin-top: 10px;
`;
