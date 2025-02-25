import React from "react";
import { Switch, Route, useLocation } from "wouter";
import makeHashRouter from "wouter/hash";
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

const HashRouter = makeHashRouter(useLocation);

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
      <HashRouter>
        <AppRouter />
      </HashRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;