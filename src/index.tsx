import './index.css';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// const documentHeight = () => {
//   const doc = document.documentElement
//   doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
//  }
//  window.addEventListener('resize', documentHeight)
//  documentHeight()

// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   // <React.StrictMode>
//   // </React.StrictMode>
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
// import './styles/index.css';

const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
 }
 window.addEventListener('resize', documentHeight)
 documentHeight()

const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App/>
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);
