import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from 'styled-components';
import theme from './components/publicStyle/theme';
import { BrowserRouter } from 'react-router-dom';
import Item from './service/item';
import LoginService from './service/loginService';
import FireStore from './service/fireStore';
import KakaoMapAPI from './service/kakaoMapAPI';

const itemDataApi = new Item();
const loginService = new LoginService();
const fireStore = new FireStore();
const kakaoMapAPI = new KakaoMapAPI();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App
          itemDataApi={itemDataApi}
          loginService={loginService}
          fireStore={fireStore}
          kakaoMapAPI={kakaoMapAPI}
        />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
