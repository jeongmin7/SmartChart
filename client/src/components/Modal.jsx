import React from "react";
import { styled } from "styled-components";

const Modal = ({ isOpen, children, handleModal }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={handleModal}>X</CloseButton>
        <ModalScrollableContent>{children}</ModalScrollableContent>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 245, 245, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 80%; /* 스크롤 가능하도록 하는 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 하는 설정 */
`;

const ModalScrollableContent = styled.div`
  flex-grow: 1; /* 스크롤 가능하도록 하는 설정 */
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;
