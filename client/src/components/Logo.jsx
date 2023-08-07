import React from "react";
import { styled } from "styled-components";
import symbol from "../assets/symbol.png";

const Logo = ({ logo }) => {
  return (
    <Wrapper logo={logo}>
      <Title logo={logo}>Smart Chart</Title>
      <Icon src={symbol} alt="logo" logo={logo} />
    </Wrapper>
  );
};

export default Logo;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.logo ? "15rem" : "30rem")};
  height: ${(props) => (props.logo ? "3rem" : "5rem")};
  align-items: flex-end;
`;
const Title = styled.div`
  color: #1798e1;
  font-weight: 700;
  font-size: ${(props) => (props.logo ? "2rem" : "4rem")};
  position: absolute;
`;
const Icon = styled.img`
  width: ${(props) => (props.logo ? "1.5rem" : "3rem")};
  height: ${(props) => (props.logo ? "1.5rem" : "3rem")};
  position: relative;
  top: ${(props) => (props.logo ? "-0.9rem" : "-2rem")};
  left: ${(props) => (props.logo ? "10.5rem" : "22rem")};
`;
