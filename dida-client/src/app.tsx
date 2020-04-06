import * as React from "react";
import * as ReactDOM from "react-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Provider } from "react-redux";
import store from "./store";
import App from "./router"; // 页面启动

const styles = require("./style.less");

const $app = document.getElementById("app");

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, $app);
