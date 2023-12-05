import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { chatUsername } from "../stores/userInfo";

const ChatComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(chatUsername);

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username) {
      navigate("/chatroom");
    }
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  return (
    <Background>
      <Container>
        <Wrapper>
          <h1>Type your username </h1>
          <h3>to enter the Chatroom </h3>
          <form id="usernameForm" name="usernameForm">
            <FormContainer>
              <Input
                type="text"
                id="name"
                placeholder="Username"
                autoComplete="off"
                className="form-control"
                onChange={handleUsername}
              />
            </FormContainer>
            <FormContainer>
              <Button
                type="submit"
                className="accent username-submit"
                onClick={handleUsernameSubmit}
              >
                Start Chatting
              </Button>
            </FormContainer>
          </form>
        </Wrapper>
      </Container>
    </Background>
  );
};

export default ChatComponent;
const Container = styled.div`
  text-align: center;
`;
const Wrapper = styled.div`
  background: #fff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  border-radius: 2px;
  width: 100%;
  max-width: 600px;
  display: inline-block;
  margin-top: 42px;
  vertical-align: middle;
  position: relative;
  padding: 35px 55px 35px;
  min-height: 400px;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: -160px;
`;
const FormContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  padding-left: 10px;
  outline: none;
  width: 100%;
  height: 40px;
`;
const Button = styled.button`
  border: 1px solid transparent;
  outline: none;
  line-height: 100%;
  white-space: nowrap;
  padding: 0.6rem 1rem;
  border-radius: 2px;
  cursor: pointer;
  min-height: 38px;
  background-color: ${palette.primary.blue};
  color: #fff;
`;
const Background = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.58;
  color: #333;
  background-color: aliceblue;
  height: 100%;
`;
import React from "react";
import { css, styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";

const Button = ({
  type,
  secondary = false,
  bgColor,
  fgColor,
  width,
  height,
  padding,
  marginB,
  fontSize,
  disabled,
  borderRadius,
  alignSelf,
  whiteSpace,
  fontweight,
  ...restProps
}) => {
  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
    height: height || "",
    marginBottom: marginB || "",
    padding: padding || "",
    fontSize: fontSize || "",
    borderRadius: borderRadius || "",
    alignSelf: alignSelf || "",
    whiteSpace: whiteSpace || "",
    fontweight: fontweight || "",
  };

  return (
    <ButtonS type={type} style={style} {...restProps} disabled={disabled} />
  );
};

export default Button;

const ButtonS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.primary.blue};
  padding: 1rem;
  color: ${palette.white};
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      background-color: #ccc;
      color: #999;
      cursor: not-allowed;
    `}
`;
