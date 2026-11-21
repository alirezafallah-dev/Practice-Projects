import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import { AppProvider } from "./context/AppContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { CommandPaletteProvider } from "./context/CommandPaletteContext.jsx";
import { ConfettiProvider } from "./context/ConfettiContext.jsx";
import { ConfirmDialogProvider } from "./context/ConfirmDialogContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Confetti from "./components/Confetti.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <MotionConfig reducedMotion="user">
          <AppProvider>
            <ThemeProvider>
              <ToastProvider>
                <CommandPaletteProvider>
                  <ConfettiProvider>
                    <ConfirmDialogProvider>
                      <App />
                      <CommandPalette />
                      <Confetti />
                    </ConfirmDialogProvider>
                  </ConfettiProvider>
                </CommandPaletteProvider>
              </ToastProvider>
            </ThemeProvider>
          </AppProvider>
        </MotionConfig>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);