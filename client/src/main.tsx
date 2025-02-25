import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle direct navigation for GitHub Pages
const handleHashRedirect = () => {
  const path = window.location.pathname;
  // Get the base URL from import.meta.env
  const base = import.meta.env.BASE_URL;

  // Remove the base URL from the path if it exists
  const pathWithoutBase = path.startsWith(base) ? path.slice(base.length) : path;

  // If we're on a path other than root and don't have a hash yet
  if (pathWithoutBase !== "/" && pathWithoutBase !== "/index.html" && !window.location.hash) {
    // Set the hash to the path without the base URL
    window.location.hash = pathWithoutBase;
  }
};

// Run the hash redirect handler
handleHashRedirect();

// Render the app
createRoot(document.getElementById("root")!).render(<App />);