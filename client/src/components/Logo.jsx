import React from "react";
import { styled } from "styled-components";
import symbol from "../assets/symbol.png";

const Logo = () => {
  return (
    <Wrapper>
      <Icons>
        {/* <BsCapsulePill /> */}
        <img
          src={symbol}
          alt="logo
        "
        />
      </Icons>
      <Title>아프Da</Title>
    </Wrapper>
  );
};

export default Logo;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 0px;
  margin-bottom: 5rem;
`;
const Title = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  left: 10px;
  font-family: Inter;
  font-size: 96px;
  font-weight: 800;
  line-height: 116px;
  letter-spacing: 0em;
  text-align: left;
  color: #1798e1;
`;

const Icons = styled.div`
  font-size: 100px;
  width: 400px;
  text-align: right;
`;
