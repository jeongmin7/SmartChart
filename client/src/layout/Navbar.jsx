import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../stores/userInfo";

const NavBar = () => {
  const pathname = useLocation().pathname;
  const userInfo = useRecoilValue(userInfoAtom);

  if (pathname === "/" || pathname === "/signUp" || pathname === " ") {
    return null;
  }
  return (
    <NavBarContainer>
      <NavLink to="/">
        <Logo nav="true" />
      </NavLink>
      <NavItems>
        <NavItem>
          {userInfo.isDoctor ? (
            <NavLink to="/adminAppointment">예약/진료관리</NavLink>
          ) : (
            <NavLink to="/appointment">병원예약</NavLink>
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
            <NavLink to="/mypage">마이페이지 </NavLink>
          )}
        </NavItem>
      </NavItems>
    </NavBarContainer>
  );
};

export default NavBar;
const NavBarContainer = styled.nav`
  background-color: #fff;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 60px;
  align-items: center;
  margin: 0;
  padding: 0;
  flex-direction: row;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  white-space: nowrap; /* 줄 바꿈 방지 */
  @media (max-width: 768px) {
    font-size: 0.5rem; // 원하는 크기로 조절
  }
`;
