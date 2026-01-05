import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./assets/index.css";
import App from "./App.jsx";
import ColorBends from "./components/animations/ColorBends";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
    <ColorBends colors={[
      "#0000FF",
      "#000080", 
      "#0d00bd",
      "#0047AB"
      ]} />
    </div>
    <App />
  </StrictMode>
);
