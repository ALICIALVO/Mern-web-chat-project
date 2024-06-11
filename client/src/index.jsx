// import React from 'react'
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App"
import GlobalStyles  from './styles/global.reset';


const container = document.getElementById('root'); 
const root = ReactDOMClient.createRoot(container);

root.render(
  <>
    <GlobalStyles />
    <App />
  </>
);
