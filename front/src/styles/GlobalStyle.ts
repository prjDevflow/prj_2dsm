// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.base};
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body.sidebar-open header {
  height: 5.5rem; /* ajuste conforme quiser */
}
  /* garante que o root seja flex para o layout (header/content/footer) */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* reset simples para tabelas (SimaPage usa table) */
  table { border-collapse: collapse; }
  th, td { text-align: left; padding: 0.5rem; }
`;

export default GlobalStyle;
