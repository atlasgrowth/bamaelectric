// App.tsx
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

// Enhanced hash-based location hook that properly handles both search params and hash routing
const useHashLocation = () => {
  // Helper to normalize paths and handle repository name conflicts
  const normalizePath = (path: string) => {
    // If the path starts with /bamaelectric/ (your repo name), strip it off
    if (path.startsWith('/bamaelectric/')) {
      path = path.substring('/bamaelectric/'.length);
    }
    // Make sure the path starts with a /
    return path.startsWith('/') ? path : '/' + path;
  };

  // Get current hash location with proper parsing
  const getHashLocation = () => {
    // Get the hash without the # symbol
    const hash = window.location.hash.replace('#', '') || '/';
    // Normalize the path to remove duplicated repository name
    return normalizePath(hash);
  };

  const [location, setLocation] = React.useState(getHashLocation());

  React.useEffect(() => {
    // Handle initial load - move search params to hash if needed
    if (!window.location.hash && window.location.search) {
      const searchParams = window.location.search;
      window.location.hash = '/';
      // We return early as the hash change will trigger our handler
      return;
    }

    const handler = () => setLocation(getHashLocation());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = React.useCallback((to: string) => {
    // Handle search params if present in the destination
    let path = to;
    let search = '';

    if (to.includes('?')) {
      const [pathPart, searchPart] = to.split('?');
      path = pathPart;
      search = '?' + searchPart;
    }

    // Ensure the path is normalized before navigation
    window.location.hash = normalizePath(path) + search;
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