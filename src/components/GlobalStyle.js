import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    font-family: monospace;
    font-size: 1.2em;
  }
  body {
    padding: 16px;
  }
`;
