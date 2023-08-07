import React from "react";
import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const Navbar = () => {
  const pathname = useLocation().pathname;
  if (pathname === "/" || pathname === "/signup" || pathname === " ") {
    return null;
  }
  return (
    <Wrapper>
      <LogoLink to="/">
        <Logo logo />
      </LogoLink>
      <Menu>
        <StyledLink to="/appointment">병원예약</StyledLink>
        <StyledLink to="/selfdiagnosis">스마트 문진</StyledLink>
        <StyledLink to="/pay">진료비 내기</StyledLink>
        <StyledLink to="/mypage">마이페이지 </StyledLink>
      </Menu>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  max-height: 5rem;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  flex-grow: 7;
  padding: 1rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;
const LogoLink = styled(Link)`
  width: 10rem;
  height: 10rem;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  flex-grow: 2.5;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
