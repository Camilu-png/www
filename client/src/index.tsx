import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const originalError = console.error;
console.error = function (...args: any[]) {
  const message = args[0];
  if (
    typeof message === "string" &&
    (message.includes("ResizeObserver") ||
      message.includes("loop completed with undelivered"))
  ) {
    return;
  }
  originalError.apply(console, args);
};

window.addEventListener("error", (event) => {
  if (
    event.message &&
    (event.message.includes("ResizeObserver") ||
      event.message.includes("loop completed"))
  ) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();