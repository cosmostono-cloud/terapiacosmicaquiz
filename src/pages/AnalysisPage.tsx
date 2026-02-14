"use client";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Lock } from "lucide-react";

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, score } = location.state || {};

  if (!userName) {
    return <div className="min-h-screen bg-background" />;
  }

  // Lógica de perfis expandida
  let resultTitle = "";
  let analysisText = "";
  let highlightText = "";
  let profileColor = "from-[#FF61D8] to-[#D436AE]";

  if (score >= 100) {
    resultTitle = "O Manifestador Bloqueado";
    highlightText = `${userName.toUpperCase()}, A SUA ANÁLISE DETECTOU UM BLOQUEIO DE ALTA VOLTAGEM EXATAMENTE ONDE DEVERIA ESTAR A SUA MAIOR EXPANSÃO.`;
    analysisText = `"Você tem uma força criativa imensa, mas parece que bate em um teto de vidro toda vez que está prestes a explodir. Existe um programa de auto-sabotagem profundo agindo como um freio de mão puxado na sua vida."`;
    profileColor = "from-[#FF4B4B] to-[#8B0000]";
  } else if (score >= 75) {
    resultTitle = "O Espectador Adormecido";
    highlightText = `${userName.toUpperCase()}, SUA REALIDADE ESTÁ SENDO DIRIGIDA POR PADRÕES HERDADOS QUE VOCÊ NEM SABE QUE EXISTEM.`;
    analysisText = `"Você sente que a vida acontece 'com você' e não 'através de você'. Existe uma névoa mental que impede a visão clara do seu poder criador, fazendo você repetir ciclos de cansaço e dúvida."`;
    profileColor = "from-[#9333EA] to-[#581C87]";
  } else if (score >= 50) {
    resultTitle = "O Buscador Oscilante";
    highlightText = `${userName.toUpperCase()}, VOCÊ ESTÁ EM UM CICLO DE BUSCA CONSTANTE, MAS A SUA ENERGIA SE DISPERSA ANTES DE CONSOLIDAR A MUDANÇA.`;
    analysisText = `"Você já acessou portais de consciência, mas a sua mente racional ainda tenta controlar o processo. Isso cria uma oscilação que drena sua vitalidade e faz você sentir que dá um passo para frente e dois para trás."`;
    profileColor = "from-[#3B82F6] to-[#1E40AF]";
  } else if (score >= 25) {
    resultTitle = "O Desperto em Expansão";
    highlightText = `${userName.toUpperCase()}, SUA FREQUÊNCIA ESTÁ ALINHADA, MAS VOCÊ AINDA NÃO ATIVOU O COMANDO TOTAL DA SUA NOVA REALIDADE.`;
    analysisText = `"A estrutura antiga já caiu, mas você ainda caminha com cautela, como se esperasse permissão para brilhar. É hora de assumir o trono da sua própria consciência e parar de pedir desculpas pelo seu poder."`;
    profileColor = "from-[#10B981] to-[#065F46]";
  } else {
    resultTitle = "O Arquiteto Consciente";
    highlightText = `${userName.toUpperCase()}, VOCÊ ESTÁ NO COMANDO, MAS AINDA EXISTEM MICRO-VIBRAÇÕES QUE IMPEDEM A MANIFESTAÇÃO INSTANTÂNEA.`;
    analysisText = `"Sua mente está limpa e focada, mas você ainda opera sob a lei do esforço em algumas áreas. O próximo nível não é sobre fazer mais, é sobre permitir que a inteligência cósmica flua sem resistência através de você."`;
    profileColor = "from-[#F59E0B] to-[#B45309]";
  }

  const handleEnterChamber = () => {
    navigate("/results", { state: { userName, score } });
  };

  return (
    <div className="min-h-screen bg-background text-white p-6 flex flex-col items-center relative overflow-x-hidden">
      <div className="nebula-bg" />

      <div className="mt-10 mb-12">
        <div className="px-6 py-2 border border-white/20 rounded-full bg-black/40 text-[10px] tracking-[0.3em] font-bold text-white flex items-center gap-2 uppercase">
          <Sparkles size={14} className="text-primary" /> Zona Mental Profunda
        </div>
      </div>

      <span className="text-[10px] tracking-[0.4em] text-secondary/60 font-bold uppercase mb-4">
        Resultado para {userName}
      </span>

      <h1 className={`text-5xl md:text-7xl font-black text-center max-w-4xl mb-12 leading-tight text-transparent bg-clip-text bg-gradient-to-b ${profileColor}`}>
        {resultTitle}
      </h1>

      <div className="w-full max-w-3xl mb-12">
        <Card className="bg-[#0D0616]/80 border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem]">
          <CardContent className="p-0 space-y-8">
            <p className="text-[#B066FF] font-black text-sm md:text-base tracking-wider leading-relaxed uppercase">
              {highlightText}
            </p>
            <p className="text-white/80 text-lg md:text-xl italic font-medium leading-relaxed">
              {analysisText}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-3xl">
        <div className="border border-[#2D1B4E] bg-[#150A24]/60 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
            <Lock size={18} /> Acesso ao Nível 2 Liberado
          </div>
          
          <p className="text-white/60 text-sm md:text-base max-w-md">
            {userName.toLowerCase()}, sua frequência foi sintonizada. A <span className="text-white font-bold">Câmara da Consciência</span> está pronta para sua ativação.
          </p>

          <Button 
            onClick={handleEnterChamber}
            className="w-full max-w-md h-16 text-lg font-black rounded-2xl bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF] text-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(157,78,221,0.4)]"
          >
            👉 Entrar na Câmara agora
          </Button>
        </div>
      </div>

      <footer className="mt-20 py-8 text-muted-foreground/40 text-[10px] tracking-[0.5em] font-bold uppercase">
        Tô no Cosmos
      </footer>
    </div>
  );
};

export default AnalysisPage;