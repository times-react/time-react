import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  h1, h2 {
    font-family: 'Arial', sans-serif;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px; /* Ajuste o tamanho da fonte em dispositivos menores */
    }
  }
`;

export default GlobalStyles;
