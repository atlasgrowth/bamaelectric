import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle direct navigation for GitHub Pages
const handleHashRedirect = () => {
  const path = window.location.pathname;
  // If we're on a path other than root and don't have a hash yet
  if (path !== "/" && path !== "/index.html" && !window.location.hash) {
    // Set the hash to the current path
    window.location.hash = path;
  }
};

// Run the hash redirect handler
handleHashRedirect();

// Render the app
createRoot(document.getElementById("root")!).render(<App />);