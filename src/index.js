import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
:root {
  --primary-color: #644be4;
  --secondary-color: #e3deff;
  --backgroung-color: #f0f0f0;
  --gilroy-regular: "Gilroy-Regular", Arial, Helvetica, sans-serif;
  --gilroy-medium: "Gilroy-Medium", Arial, Helvetica, sans-serif;
  --gilroy-semibold: "Gilroy-SemiBold", Arial, Helvetica, sans-serif;
  --gilroy-bold: "Gilroy-Bold", Arial, Helvetica, sans-serif;
}
@font-face {
  font-family: "Gilroy-Regular";
  src: url(./assets/fonts/Gilroy-Regular.ttf);
}
@font-face {
  font-family: "Gilroy-Medium";
  src: url(./assets/fonts/Gilroy-Medium.ttf);
}
@font-face {
  font-family: "Gilroy-SemiBold";
  src: url(./assets/fonts/Gilroy-SemiBold.ttf);
}
@font-face {
  font-family: "Gilroy-Bold";
  src: url(./assets/fonts/Gilroy-Bold.ttf);
  font-weight: bold;
}

* {
  margin:0;
  padding:0;
  box-sizing:border-box;  
}::selection {
  color: #fff;
  background-color: var(--primary-color);
}
body {
  font-family: var(--gilroy-regular);
  font-size: 16px;
  letter-spacing: 0.5px;
  min-height: 100vh;
  background-color: var(--backgroung-color);
}
main {
  display: flex;
  padding: 30px 40px;
};`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>
);
reportWebVitals();
