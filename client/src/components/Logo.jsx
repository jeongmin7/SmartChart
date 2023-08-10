import React from "react";
import { styled } from "styled-components";
import smartLogo from "../assets/smartLogo.png";

const Logo = ({ nav }) => {
  return <Wrapper nav={nav}></Wrapper>;
};

export default Logo;

const Wrapper = styled.div`
  width: ${(props) => (props.nav ? "260px" : "520px")};
  height: ${(props) => (props.nav ? "65px" : "130px")};

  background-color: yellow;
  background: url(${smartLogo}) no-repeat center center / 100% 100%;
`;
