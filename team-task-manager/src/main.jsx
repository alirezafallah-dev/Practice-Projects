import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { CommandPaletteProvider } from "./context/CommandPaletteContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Confetti from "./components/Confetti.jsx";
import App from "./App.jsx";
import "./index.css";
import { ConfirmDialogProvider } from "./context/ConfirmDialogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <ToastProvider>
            <CommandPaletteProvider>
              <ConfirmDialogProvider>
                <App />
                <CommandPalette />
                <Confetti />
              </ConfirmDialogProvider>
            </CommandPaletteProvider>
          </ToastProvider>
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);