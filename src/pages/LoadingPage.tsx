"use client";

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Ícone de carregamento

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, score } = location.state || {}; // Recebe o nome e a pontuação do quiz

  useEffect(() => {
    if (userName === undefined || score === undefined) {
      // Se não houver dados, redireciona para o quiz para evitar erros
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      navigate("/results", { state: { userName, score }, replace: true });
    }, 3000); // Simula um carregamento de 3 segundos

    return () => clearTimeout(timer);
  }, [navigate, userName, score]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-gradient-radial before:from-primary/10 before:to-transparent before:animate-pulse-slow before:z-0">
      <h1 className="text-4xl font-bold text-primary mb-8 z-10">Tô no Cosmos</h1>
      <div className="text-center z-10">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-6 mx-auto" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Preparando seu resultado...</h1>
        <p className="text-lg text-muted-foreground">Aguarde um momento enquanto analisamos suas respostas.</p>
      </div>
    </div>
  );
};

export default LoadingPage;