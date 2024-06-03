import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset'; // Importing the CSS reset

const GlobalStyle = createGlobalStyle`
  ${reset}  // Apply the reset CSS

  /* Additional global styles can be added here */



  /* You can add more global styles as needed */
`;

export default GlobalStyle;
