import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
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

// Create a custom hook that uses hash-based routing for GitHub Pages
const useHashLocation = () => {
  const [hash, setHash] = React.useState(
    () => window.location.hash.replace("#", "") || "/"
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "") || "/";
      setHash(newHash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [hash, navigate];
};

function Router() {
  // Use the hash-based routing hook for GitHub Pages compatibility
  return (
    <WouterRouter hook={useHashLocation}>
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
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;