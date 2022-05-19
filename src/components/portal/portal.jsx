// import React, { useEffect } from 'react';
import React, { useEffect, useRef } from 'react';
import reactDom from 'react-dom';

// const Button = styled.button``;
// const Section = styled.section`
//   width: 100%;
//   height: 100%;
//   // background-size: cover;
// `;
// const GlobalStyle = createGlobalStyle`
//   body {
//     color: #21519;
//     max-width: 768px;
//     min-width: 320px;
//     width: 100%;
//     height: 100%;
//     margin: 0 auto;
//     position: relative;
//     background-color: #fff;
//   }
// `;

const Portal = ({ children, idSelector }) => {
  console.log('id', idSelector);
  console.log(children);

  const container = document.getElementById(idSelector);

  return children && reactDom.createPortal(children, container);
};

export default Portal;
