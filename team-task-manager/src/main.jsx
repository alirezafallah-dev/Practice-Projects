import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { ConfirmDialogProvider } from "./context/ConfirmDialogContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ConfirmDialogProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </ConfirmDialogProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);