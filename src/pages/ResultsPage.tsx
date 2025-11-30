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
            <p className="text-muted-foreground mb-6">Parece que você chegou aqui sem passar pelo quiz. Por favor, inicie sua jornada para descobrir seu perfil!</p>
            <Link to="/">
              <Button>Iniciar Jornada</Button>
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
    resultTitle = "Seu Perfil: Travada 🔒";
    resultDescription = `Olá ${userName}, suas respostas revelam um potencial imenso, mas também indicam que você está em um ponto de virada, sentindo-se "travada" por padrões e emoções antigas. Este é o momento de buscar clareza, equilíbrio e uma profunda liberação energética. A Terapia Cósmica é o caminho para destravar esses bloqueios, realinhar sua energia e impulsionar você para uma vida de leveza e propósito.`;
    resultIcon = <Lock className="h-16 w-16 text-destructive mb-4 mx-auto animate-bounce-slow" />;
    resultColor = "text-destructive";
    callToAction = "Pronta para se libertar e iniciar sua transformação agora?";
  } else if (score >= 41) {
    resultTitle = "Seu Perfil: Em Despertar 💡";
    resultDescription = `Olá ${userName}, suas respostas mostram que você está em um belo processo de despertar, buscando ativamente autoconhecimento e um maior equilíbrio. Você já sente o chamado para a mudança e está aberta a expandir suas perspectivas. A Terapia Cósmica pode ser o catalisador que você precisa para acelerar essa jornada, oferecendo ferramentas poderosas para purificar o que não serve mais e fortalecer sua conexão interior.`;
    resultIcon = <Lightbulb className="h-16 w-16 text-primary mb-4 mx-auto animate-bounce-slow" />;
    resultColor = "text-primary";
    callToAction = "Deseja aprofundar seu despertar e manifestar sua verdadeira essência?";
  } else {
    resultTitle = "Seu Perfil: Em Evolução 🌱";
    resultDescription = `Olá ${userName}, suas respostas brilham, indicando que você já está em um caminho de evolução e profunda conexão, com clareza e equilíbrio notáveis. Você busca aprimorar ainda mais sua jornada, elevando-se à sua versão mais autêntica e poderosa. A Terapia Cósmica oferece o suporte ideal para sustentar essa energia, expandir sua consciência e cocriar seus maiores desejos com o universo.`;
    resultIcon = <Leaf className="h-16 w-16 text-green-500 mb-4 mx-auto animate-bounce-slow" />;
    resultColor = "text-green-500";
    callToAction = "Que tal explorar novas dimensões do seu ser e continuar sua ascensão?";
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('/images/pensamento.png')` }}
    >
      {/* Overlay para escurecer a imagem de fundo e melhorar a legibilidade */}
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
      
      {/* Efeito de pulsação sutil no fundo */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent animate-pulse-slow z-0"></div>

      <h1 className="text-5xl font-extrabold text-primary mb-10 z-10 drop-shadow-lg">Tô no Cosmos</h1>
      <Card className="w-full max-w-lg text-center relative z-10 bg-card/90 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-700 shadow-2xl border-primary/30">
        <CardHeader className="pt-8">
          {resultIcon}
          <CardTitle className={`text-3xl font-bold ${resultColor} mb-3 leading-tight`}>{resultTitle}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground px-4">{resultDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pb-8">
          <p className="text-xl font-semibold text-foreground">Sua pontuação na jornada: <span className="font-bold text-primary text-2xl">{score}</span> pontos.</p>
          <p className="text-xl font-bold text-foreground">{callToAction}</p>
          <a href="https://terapiacosmica.tonocosmos.com.br/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full py-4 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Quero Iniciar Minha Transformação!
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;