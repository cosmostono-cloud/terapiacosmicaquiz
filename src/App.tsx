import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import FunnelPage from "./pages/FunnelPage";
import LoadingPage from "./pages/LoadingPage";
import AnalysisPage from "./pages/AnalysisPage"; // Nova página
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/funil" element={<FunnelPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/analysis" element={<AnalysisPage />} /> {/* Nova rota */}
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;