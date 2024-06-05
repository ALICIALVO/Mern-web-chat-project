import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset'; // Importing the CSS reset

const GlobalStyle = createGlobalStyle`
  ${reset}  // Apply the reset CSS

`;

export default GlobalStyle;
