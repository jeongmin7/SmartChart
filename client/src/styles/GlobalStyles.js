import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const zIndex = {
  // example
  // popupDialog: 100,
  modal: 2000,
};

export const sizes = {
  header: "100px",
};

export const palette = {
  // example
  gray: {
    0: "#F4F4F4",
    // 1: "#6f6f6f",
    // 2: "#393939",
    3: "#C4C4C4",
    // 4: "#353535",
    // 5: "#525252",
    // 6: "#C6C6C6",
    // 7: "rgba(141, 141, 141, 0.24)",
    // 8: "#8d8d8d41",
    light: "#dfdfdf",
    // middle: "#f7f7f7",
    border: "#CBC5C5",
    dark: "#808080",
  },

  blue: {
    light: "#e7f1f5",
  },

  white: "#fff",
  primary: {
    blue: "#1798e1",
    black: "#000",
  },
  text: "#3c3c3b",
};

export const size = {
  // example
  //   header: 48,
  //   minHeight: 700,
  //   minWidth: 1100,
  //   modalWidth: 705,
};

export const GlobalStyle = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
        
    }
    body{
        padding: 0;
        margin: 0;
        font-family: 'IBM Plex Sans', sans-serif;
    };
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        border-radius: 3px;
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
        
    }
    h1{
        font-size: 3rem;
        font-weight: 600;
    }
    h3{
        font-size: 2rem;
        font-weight: 400;
    }
`;
