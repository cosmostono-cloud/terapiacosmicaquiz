"use client";

import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Lightbulb, Lock, Leaf } from "lucide-react"; // Ícones para os resultados

const ResultsPage = () => {
  const location = useLocation();
  const { userName, score } = location.state || {};

  if (userName === undefined || score === undefined) {
    // Caso a página seja acessada diretamente sem dados do quiz
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-4xl font-bold text-primary mb-8 z-10">Tô no Cosmos</h1>
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Erro ao carregar resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Por favor, refaça o quiz para ver seu resultado.</p>
            <Link to="/">
              <Button>Iniciar Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  let resultTitle = "";
  let resultDescription = "";
  let resultIcon = null;
  let resultColor = "";
  let callToAction = "";

  // Definição dos perfis com base na pontuação (Max score = 120)
  if (score >= 81) {
    resultTitle = "Você está no perfil: Travada 🔒";
    resultDescription = `Olá ${userName}, com base nas suas respostas, percebo que você está num momento de transição interna e precisa de clareza, equilíbrio e liberação energética. Há padrões e emoções antigas que estão te impedindo de avançar. A Terapia Cósmica vai te ajudar a destravar esses bloqueios e realinhar sua energia para que você viva com mais leveza e direção.`;
    resultIcon = <Lock className="h-12 w-12 text-destructive mb-4 mx-auto" />;
    resultColor = "text-destructive";
    callToAction = "Quer receber mais detalhes e iniciar sua transformação?";
  } else if (score >= 41) {
    resultTitle = "Você está no perfil: Em Despertar 💡";
    resultDescription = `Olá ${userName}, suas respostas indicam que você está em um processo de despertar, buscando maior autoconhecimento e equilíbrio. Você já percebe a necessidade de mudança e está aberta a novas perspectivas. A Terapia Cósmica pode acelerar sua jornada, oferecendo ferramentas para limpar o que não serve mais e fortalecer sua conexão interior.`;
    resultIcon = <Lightbulb className="h-12 w-12 text-primary mb-4 mx-auto" />;
    resultColor = "text-primary";
    callToAction = "Pronta para aprofundar seu despertar e encontrar sua verdadeira essência?";
  } else {
    resultTitle = "Você está no perfil: Em Evolução 🌱";
    resultDescription = `Olá ${userName}, suas respostas mostram que você já está em um caminho de evolução e conexão, com boa clareza e equilíbrio. Você busca aprimorar ainda mais sua jornada e dar os próximos passos em direção à sua versão mais elevada. A Terapia Cósmica pode oferecer suporte para manter essa energia, expandir sua consciência e manifestar seus maiores desejos.`;
    resultIcon = <Leaf className="h-12 w-12 text-green-500 mb-4 mx-auto" />;
    resultColor = "text-green-500";
    callToAction = "Que tal explorar novas dimensões do seu ser e continuar sua evolução?";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-gradient-radial before:from-primary/10 before:to-transparent before:animate-pulse-slow before:z-0">
      <h1 className="text-4xl font-bold text-primary mb-8 z-10">Tô no Cosmos</h1>
      <Card className="w-full max-w-md text-center relative z-10 animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          {resultIcon}
          <CardTitle className={`text-2xl font-bold ${resultColor} mb-2`}>{resultTitle}</CardTitle>
          <CardDescription className="text-muted-foreground">{resultDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-semibold text-foreground">{callToAction}</p>
          <a href="https://terapiacosmica.tonocosmos.com.br/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full py-3 text-lg hover:scale-105 transition-transform duration-300">
              Quero Saber Mais!
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;