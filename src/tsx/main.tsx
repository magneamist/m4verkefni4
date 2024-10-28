import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "../css/index.css";
import Dialog from "./dialog.tsx";
import Header1 from "./h1.tsx";

// the name value from the Dialog component is passed to the Header1 component
const App = () => {
  const [name, setName] = useState<string>("bitch");
  return (
    <div>
      <Header1 name={name} />
      <Dialog onClickSetName={setName} />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
