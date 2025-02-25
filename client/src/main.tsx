import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Remove the base URL from the hash path to prevent double paths
const base = import.meta.env.BASE_URL;
if (window.location.hash.includes(base)) {
  const newPath = window.location.hash.replace(base, '');
  window.location.hash = newPath;
}

// Handle direct navigation for GitHub Pages
window.addEventListener('load', () => {
  const path = window.location.pathname;

  // If we're on a path other than root and don't have a hash yet
  if (path !== `${base}` && path !== `${base}index.html` && !window.location.hash) {
    // Set the hash to the path without the base URL
    const pathWithoutBase = path.replace(base, '');
    window.location.hash = pathWithoutBase || '/';
  }
});

// Render the app
createRoot(document.getElementById("root")!).render(<App />);