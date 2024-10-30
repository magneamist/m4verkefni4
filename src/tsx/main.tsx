import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../css/index.css";
import App from "./app";

// the name value from the Dialog component is passed to the Header1 component

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
