import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const pathname = useLocation().pathname;
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
          <NavLink to="/appointment">병원예약</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/selfdiagnosis">스마트 문진</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/pay">진료비 내기</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/mypage">마이페이지 </NavLink>
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
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
`;
