import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./App.css";

/* React 애플리케이션이 마운트될 DOM 루트 지정 */
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Redux 전역 상태를 애플리케이션 전체에 제공 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
