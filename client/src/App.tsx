import React from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Residential from "@/pages/Residential";
import Commercial from "@/pages/Commercial";
import Industrial from "@/pages/Industrial";

// Improved hash-based location hook that handles the repository prefix
const useHashLocation = () => {
  // Helper to normalize paths - removes duplicate repository name
  const normalizePath = (path: string) => {
    // If the path starts with /bamaelectric/ (your repo name), strip it off
    if (path.startsWith('/bamaelectric/')) {
      path = path.substring('/bamaelectric/'.length);
    }
    // Make sure the path starts with a /
    return path.startsWith('/') ? path : '/' + path;
  };

  const getHashLocation = () => {
    // Get the hash without the # symbol
    const hash = window.location.hash.replace('#', '') || '/';
    // Normalize the path to remove duplicated repository name
    return normalizePath(hash);
  };

  const [location, setLocation] = React.useState(getHashLocation());

  React.useEffect(() => {
    const handler = () => setLocation(getHashLocation());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = React.useCallback((to: string) => {
    // Ensure the path is normalized before navigation
    window.location.hash = normalizePath(to);
  }, []);

  return [location, navigate] as const;
};

function AppRouter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/residential" component={Residential} />
          <Route path="/commercial" component={Commercial} />
          <Route path="/industrial" component={Industrial} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <AppRouter />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;