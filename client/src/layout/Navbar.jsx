import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../stores/userInfo";
import patientIcon from "../assets/patient.png";
import femaleDoctor from "../assets/doctor_female.png";
import maleDoctor from "../assets/doctor_male.png";
import { CiSquareChevDown } from "react-icons/ci";
import { path } from "../modules/define/path";
const NavBar = () => {
  const pathname = useLocation().pathname;
  const userInfo = useRecoilValue(userInfoAtom);
  // const menu = ["로그아웃", "마이페이지", "병원페이지"];
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  if (pathname === "/" || pathname === "/signUp" || pathname === " ") {
    return null;
  }
  return (
    <NavBarContainer className="navbar-container">
      <NavLink to={path.home}>
        <Logo nav="true" />
      </NavLink>
      <NavItems>
        <NavItem>
          {userInfo.isDoctor ? (
            <NavLink to="/adminAppointment">예약/진료관리</NavLink>
          ) : (
            <NavLink to="/searchHospital">병원예약</NavLink>
          )}
        </NavItem>
        <NavItem>
          {userInfo.isDoctor ? (
            <NavLink to="/adminWaitingList">환자 대기 관리</NavLink>
          ) : (
            <NavLink to="/selfdiagnosis">스마트 문진</NavLink>
          )}
        </NavItem>
        <NavItem>
          {userInfo.isDoctor ? (
            <NavLink to="/accounting">매출관리</NavLink>
          ) : (
            <NavLink to="/pay">진료비 내기</NavLink>
          )}
        </NavItem>
        <NavItem>
          {userInfo.isDoctor ? (
            <NavLink to="/teleConsult">실시간 진료 상담</NavLink>
          ) : (
            ""
          )}
        </NavItem>
        {/* TODO:여기가 드롭다운이 생길 부분 */}
        <NavItem>
          {userInfo.isDoctor ? (
            userInfo.gender === "female" ? (
              <NameContainer>
                <Icon src={femaleDoctor} alt="여자의사" />
                <div>{userInfo.username}의사</div>
                <CiSquareChevDown onClick={toggleDropdown} />
              </NameContainer>
            ) : (
              <NameContainer>
                <Icon src={maleDoctor} alt="남자의사" />
                <div>{userInfo.username}의사</div>
                <CiSquareChevDown onClick={toggleDropdown} />
              </NameContainer>
            )
          ) : (
            <NameContainer>
              <Icon src={patientIcon} alt="환자아이콘" />
              <div>{userInfo.username}환자</div>
              <CiSquareChevDown onClick={toggleDropdown} />
            </NameContainer>
          )}
          {/* TODO:드롭다운이 생길부분 */}{" "}
          <MenuContent open={isOpen}>
            <MenuLinkContainer>
              <SignoutButton
                onClick={() => {
                  console.log("logout");
                }}
              >
                로그아웃
              </SignoutButton>
              {userInfo.isDoctor ? (
                <MenuLink to="/hospitalPage">병원페이지</MenuLink>
              ) : (
                <MenuLink to="/mypage">마이페이지</MenuLink>
              )}
            </MenuLinkContainer>
          </MenuContent>
        </NavItem>
      </NavItems>
    </NavBarContainer>
  );
};

export default NavBar;
const NavBarContainer = styled.nav`
  background-color: #fff;
  padding: 1rem;
  height: 100px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItems = styled.div`
  list-style: none;
  display: flex;
  gap: 60px;
  align-items: center;
  margin: 0;
  padding: 0;
  flex-direction: row;
`;

const NavItem = styled.div`
  margin-right: 1rem;
  &:last-child {
    position: relative;
    z-index: 2;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  white-space: nowrap; /* 줄 바꿈 방지 */
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

const Icon = styled.img`
  width: 2rem;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  white-space: nowrap;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;
const MenuContent = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 2%;
  z-index: 1;
  padding: 1rem;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid gray;
  white-space: nowrap;
`;
const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const MenuLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SignoutButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
