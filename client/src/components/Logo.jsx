import React from "react";
import { styled } from "styled-components";
import smartLogo from "../assets/smartLogo.png";

const Logo = ({ logo }) => {
  return <Wrapper logo={logo}></Wrapper>;
};

export default Logo;

const Wrapper = styled.div`
  width: 520px;
  height: 130px;
  background-color: yellow;
  background: url(${smartLogo}) no-repeat center center / 100% 100%;
`;
