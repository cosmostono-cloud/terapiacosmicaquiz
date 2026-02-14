"use client";

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, score } = location.state || {};

  useEffect(() => {
    if (userName === undefined) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      // Agora navega para /analysis em vez de /results
      navigate("/analysis", { state: { userName, score }, replace: true });
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate, userName, score]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full animate-pulse"></div>
      
      <div className="relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 border border-primary/30 rounded-full bg-primary/5 text-[10px] tracking-[0.3em] font-bold text-primary uppercase mb-4">
          <Sparkles size={12} /> Sintonizando Frequência
        </div>
        
        <div className="relative">
          <Loader2 className="h-20 w-20 animate-spin text-primary mx-auto opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>

        <h1 className="text-3xl font-black text-white tracking-tighter">
          Analisando seus <br />
          <span className="text-primary">Padrões Mentais...</span>
        </h1>
        
        <p className="text-muted-foreground text-sm tracking-widest uppercase font-bold opacity-50">
          Aguarde a calibração final
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;