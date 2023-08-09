import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RainbowKit from "./Utils/Rainbowkit"
import { Provider } from 'react-redux';
import Store from './Redux/Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <RainbowKit>
      <Provider store={Store}>
         <App />
       </Provider>
    </RainbowKit>
  </React.StrictMode>
  </BrowserRouter>
);


