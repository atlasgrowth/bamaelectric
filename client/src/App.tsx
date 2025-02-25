// In App.tsx
import React from "react";
import { Switch, Route, Router } from "wouter";
import { useLocation } from "wouter/use-location";
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

// Custom hash-based location hook for GitHub Pages
const useHashLocation = () => {
  const [hash, setHash] = React.useState(() => 
    window.location.hash.replace("#", "") || "/"
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "") || "/";
      setHash(newHash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = React.useCallback((to: string) => {
    // Always use relative paths for navigation
    window.location.hash = to.replace(/^\//, '');
  }, []);

  return [hash, navigate] as [string, (to: string) => void];
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