import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GameSettingsProvider } from "./context/GameSettings/GameSettingsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GameSettingsProvider>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </GameSettingsProvider>
  </BrowserRouter>
);
