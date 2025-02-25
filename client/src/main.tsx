// main.tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle URL parameters on initial load
const handleInitialLoad = () => {
  // If there's a search parameter but no hash, we need to set up the hash routing
  if (window.location.search && !window.location.hash) {
    // Get the current URL parameters
    const params = new URLSearchParams(window.location.search);
    // Store them for access after the hash is set
    const storedParams = {};

    params.forEach((value, key) => {
      storedParams[key] = value;
    });

    // Store in sessionStorage temporarily
    sessionStorage.setItem('urlParams', JSON.stringify(storedParams));

    // Set the hash to trigger the router
    window.location.hash = '/';

    // The App component will handle the rest when it mounts
    return;
  }
};

// Run the initial handler
handleInitialLoad();

// Render the app
createRoot(document.getElementById("root")!).render(<App />);