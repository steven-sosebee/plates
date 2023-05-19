import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function pnAvailable() {
  var bAvailable = false;
  if (window.isSecureContext) {
      // running in secure context - check for available Push-API
      bAvailable = (('serviceWorker' in navigator) && 
                    ('PushManager' in window) && 
                    ('Notification' in window)); 
      console.log(`bAvailable - ${bAvailable}`)
  } else {
      console.log('site have to run in secure context!');
  }
  return bAvailable;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => {
          console.log("service worker registered");
          console.log(res.scope)})
      .catch(err => console.log("service worker not registered", err))
  })
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// pnSubscribe();
reportWebVitals();
