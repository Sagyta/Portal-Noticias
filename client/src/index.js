import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";          // Todas las rutas están en App
import { Provider } from "react-redux";
import store from "./redux/store/store"; // Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
