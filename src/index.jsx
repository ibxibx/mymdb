import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import ErrorBoundary from "./ErrorBoundary";
import "./index.scss";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <MainView />
    </ErrorBoundary>
  </React.StrictMode>
);
