import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle direct navigation and base URL for GitHub Pages
window.addEventListener('load', () => {
  const path = window.location.pathname;
  const base = import.meta.env.BASE_URL;
  const hash = window.location.hash;

  // If we have a path but no hash, convert it to hash-based route
  if (path !== base && path !== `${base}index.html` && !hash) {
    const pathWithoutBase = path.replace(base, '');
    window.location.replace(`${base}#${pathWithoutBase}`);
  }
});

// Render the app
createRoot(document.getElementById("root")!).render(<App />);