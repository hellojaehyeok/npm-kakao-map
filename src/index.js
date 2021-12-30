import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



// let kakaoScript = document.createElement("script");
// kakaoScript.src=`//dapi.kakao.com/v2/maps/sdk.js?appkey=%process.env.REACT_APP_KAKAOMAP_API_KEY%&libraries=clusterer,services`;
// console.log(kakaoScript);
// document.querySelector("body").append(kakaoScript);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);