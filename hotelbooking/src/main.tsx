import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      onReset={() => window.location.replace("/")}
      FallbackComponent={ErrorFallback}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
