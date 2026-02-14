"use client";

import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Play, Pause, Sparkles, ChevronDown } from "lucide-react";

const ResultsPage = () => {
  const location = useLocation();
  const { userName, score } = location.state || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!userName) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Link to="/"><Button>Iniciar Jornada</Button></Link>
      </div>
    );
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  let resultTitle = "";
  let resultDescription = "";
  let resultColor = "text-primary";

  if (score >= 81) {
    resultTitle = "Frequência: Bloqueada";
    resultDescription = "Sua mente está operando em um ciclo de repetição. Algo dentro de você ainda não foi ativado.";
    resultColor = "text-red-400";
  } else if (score >= 41) {
    resultTitle = "Frequência: Despertando";
    resultDescription = "Você começou a sintonizar a nova realidade, mas a conexão ainda oscila.";
  } else {
    resultTitle = "Frequência: Elevada";
    resultDescription = "Sua consciência está em expansão. Você está pronta para o próximo nível.";
    resultColor = "text-secondary";
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-6 flex flex-col items-center overflow-x-hidden relative">
      <div className="nebula-bg" />
      <audio ref={audioRef} src="/audio/respire-fundo.mp3" onEnded={() => setIsPlaying(false)} />

      {/* Header */}
      <div className="mt-6 md:mt-10 mb-10 md:mb-16 flex flex-col items-center gap-4">
        <div className="px-4 py-1 border border-primary/50 rounded-full bg-primary/10 text-[10px] tracking-[0.2em] font-bold text-primary flex items-center gap-2 uppercase">
          <Sparkles size={12} /> Câmara da Consciência
        </div>
        <span className="text-[10px] tracking-[0.4em] text-secondary/60 font-bold uppercase">Acesso Concedido</span>
      </div>

      {/* Headline */}
      <h1 className="text-3xl md:text-6xl font-black text-center max-w-4xl mb-10 md:mb-16 leading-tight px-2">
        {userName.toLowerCase()}, algo dentro da sua <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          mente ainda não foi ativado.
        </span>
      </h1>

      {/* Player Imersivo */}
      <div className="w-full max-w-4xl relative group">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full opacity-50"></div>
        
        <Card className="glass-card border-white/5 overflow-hidden relative z-10">
          <CardContent className="p-0">
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-secondary font-bold uppercase mb-8 md:mb-12">
                <Headphones size={14} /> Experiência Imersiva
              </div>

              {/* Avatar Central */}
              <div className="relative mb-8 md:mb-16">
                <div className={`absolute inset-0 bg-primary/30 blur-3xl rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-4 ${isPlaying ? 'border-primary' : 'border-white/10'} p-1 relative z-10 transition-all duration-500`}>
                  <img 
                    src="/images/player-avatar.png" 
                    alt="Perfil" 
                    className={`w-full h-full object-cover rounded-full ${isPlaying ? '' : 'grayscale opacity-50'} transition-all duration-700`}
                  />
                </div>
              </div>

              {/* Barra de Frequência */}
              <div className="w-full max-w-2xl mb-8 md:mb-12">
                <div className="flex justify-between text-[8px] tracking-widest text-white/40 font-bold uppercase mb-2">
                  <span>{isPlaying ? 'Frequência Ativa' : 'Frequência em Espera'}</span>
                  <span>{isPlaying ? 'Sintonizando...' : 'Aguardando Play'}</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                  {isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
                  )}
                </div>
              </div>

              {/* Botão Play/Pause */}
              <div className="flex flex-col items-center gap-4 md:gap-6">
                {!isPlaying && (
                  <div className="px-4 py-1 bg-secondary text-[10px] font-black rounded-full text-white uppercase tracking-tighter animate-bounce">
                    Clique no Play
                  </div>
                )}
                <button 
                  onClick={toggleAudio}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
                >
                  {isPlaying ? (
                    <Pause size={32} md:size={40} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play size={32} md:size={40} fill="currentColor" className="ml-1 md:ml-2 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicador de Rolagem */}
      <div className="mt-8 flex flex-col items-center gap-2 animate-bounce opacity-50 md:hidden">
        <span className="text-[10px] font-bold uppercase tracking-widest">Role para continuar</span>
        <ChevronDown size={16} />
      </div>

      {/* Resultado e CTA */}
      <div className="mt-16 md:mt-24 max-w-2xl text-center space-y-6 md:space-y-8 pb-20 px-4">
        <div className={`text-xl md:text-2xl font-bold tracking-tighter uppercase ${resultColor}`}>
          {resultTitle}
        </div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {resultDescription}
        </p>
        <a href="https://terapiacosmica.tonocosmos.com.br/" target="_blank" rel="noopener noreferrer" className="block pt-4 md:pt-8">
          <Button 
            size="lg" 
            className="w-full md:w-auto h-14 md:h-16 px-8 md:px-12 text-base md:text-xl font-black bg-gradient-to-r from-primary to-secondary text-white rounded-full glow-lilac hover:scale-105 transition-all animate-[pulse-glow_2s_infinite]"
          >
            ATIVAR MINHA CONSCIÊNCIA AGORA
          </Button>
        </a>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px hsl(var(--primary) / 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 40px hsl(var(--secondary) / 0.6); transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;