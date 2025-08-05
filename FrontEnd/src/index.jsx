import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

import { store } from "./store/reduxStore/store";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";
import "./App.css";
import "./MediaQuery.css";
import "./utilities.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
    <ToastContainer />
  </Provider>
);
 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log("✅ Service Worker Registered"))
      .catch(err => console.error("❌ SW Error", err));
  });
}
