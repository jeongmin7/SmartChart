import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { styled } from "styled-components";
import { palette, zIndex } from "../styles/GlobalStyles";

const Loader = ({ basic }) => {
  if (basic) {
    <div>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={true}
      />
    </div>;
  }
  return (
    <LoaderContainer>
      <RotatingLines
        strokeColor="#1798e1"
        strokeWidth="5"
        animationDuration="0.75"
        width="200"
        visible={true}
      />
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  position: fixed; /* 스크롤을 움직여도 전체 영역을 감쌀 수 있도록 */
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.primary.black};
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  z-index: ${zIndex.modal};
`;
