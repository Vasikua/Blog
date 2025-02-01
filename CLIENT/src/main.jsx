import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GlobalState from "./contex/GlobalState.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalState>
      <App />
    </GlobalState>
  </BrowserRouter>
);
