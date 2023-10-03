import React from "react";
import { styled } from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Modal = ({ isOpen, children, handleModal }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={handleModal}>
          <AiOutlineCloseCircle size={20} />
        </CloseButton>
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
  background-color: rgba(107, 108, 114, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  position: relative;
  padding: 10px;
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
  position: absolute;
  top: 3px;
  right: 3px;
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;
