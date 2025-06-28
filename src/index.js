import ReactDOM from "react-dom/client";
import React from 'react';
import { applyPolyfills, defineCustomElements } from "h8k-components/loader";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

applyPolyfills().then(() => {
  defineCustomElements(window);
});
