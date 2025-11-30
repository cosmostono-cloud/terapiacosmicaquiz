import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import FunnelPage from "./pages/FunnelPage";
import LoadingPage from "./pages/LoadingPage"; // Importar a nova LoadingPage
import ResultsPage from "./pages/ResultsPage"; // Importar a nova ResultsPage
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizPage />} /> {/* Agora o quiz é a página inicial */}
          <Route path="/funil" element={<FunnelPage />} />
          <Route path="/loading" element={<LoadingPage />} /> {/* Rota para a página de carregamento */}
          <Route path="/results" element={<ResultsPage />} /> {/* Rota para a página de resultados */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;