// App.tsx yang saya test
import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import Home from "./pages/Home";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/home" component={Home} />
      
      {/* Redirect semua path tidak dikenal ke root */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function App() {
  console.log("Current path is:", window.location.pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;