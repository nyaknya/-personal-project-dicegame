import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CharactersProvider from "./context/CharactersContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CharactersProvider>
      <App />
    </CharactersProvider>
  </React.StrictMode>
);
