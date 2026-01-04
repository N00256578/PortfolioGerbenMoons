import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App.jsx";
import Aurora from "./components/animations/Aurora";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Aurora
        colorStops={["#4169e1", "#204e5f", "#191970"]}
        blend={0.5}
        amplitude={0.3}
        speed={0.5}
      />
    </div>
    <App />
  </StrictMode>
);
