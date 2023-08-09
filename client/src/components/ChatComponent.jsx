import React, { useState } from "react";
import styled, { css } from "styled-components";

const ChatComponent = () => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);

  return (
    <main>
      <StyledGrid>
        <StyledSection isHidden={layout}>Contact</StyledSection>
        <StyledSection isHidden={!layout}>chat</StyledSection>
      </StyledGrid>
    </main>
  );
};

export default ChatComponent;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }
`;

const StyledSection = styled.section`
  display: flex;
  @media (max-width: 767px) {
    ${(props) =>
      props.isHidden &&
      css`
        display: none;
      `}
  }
`;
