import React from "react";
import { PiChatsCircleLight } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const ChatIcon = () => {
  const pathname = useLocation().pathname;
  if (pathname === "/" || pathname === "/signup") {
    return null;
  }
  return (
    <Icon to="/chat">
      <PiChatsCircleLight />
    </Icon>
  );
};

export default ChatIcon;
const Icon = styled(Link)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  font-size: 4rem;
  color: #333;
`;
