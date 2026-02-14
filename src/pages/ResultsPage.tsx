"use client";

import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Play, Pause, Sparkles } from "lucide-react";

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
    resultColor = "text-green-400";
  }

  return (
    <div className="min-h-screen bg-background text-white p-6 flex flex-col items-center overflow-x-hidden relative">
      <audio ref={audioRef} src="/audio/respire-fundo.mp3" onEnded={() => setIsPlaying(false)} />

      {/* Header */}
      <div className="mt-10 mb-16 flex flex-col items-center gap-4">
        <div className="px-4 py-1 border border-primary/50 rounded-full bg-primary/10 text-[10px] tracking-[0.2em] font-bold text-primary flex items-center gap-2 uppercase">
          <Sparkles size={12} /> Câmara da Consciência
        </div>
        <span className="text-[10px] tracking-[0.4em] text-primary/60 font-bold uppercase">Acesso Concedido</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-black text-center max-w-4xl mb-16 leading-tight">
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
            <div className="p-8 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-primary font-bold uppercase mb-12">
                <Headphones size={14} /> Experiência Imersiva
              </div>

              {/* Avatar Central */}
              <div className="relative mb-16">
                <div className={`absolute inset-0 bg-primary/30 blur-3xl rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                <div className={`w-48 h-48 rounded-full border-4 ${isPlaying ? 'border-primary' : 'border-primary/40'} p-1 relative z-10 transition-all duration-500`}>
                  <img 
                    src="/images/player-avatar.png" 
                    alt="Perfil" 
                    className={`w-full h-full object-cover rounded-full ${isPlaying ? '' : 'grayscale'} transition-all duration-700`}
                  />
                </div>
              </div>

              {/* Barra de Frequência */}
              <div className="w-full max-w-2xl mb-12">
                <div className="flex justify-between text-[8px] tracking-widest text-white/40 font-bold uppercase mb-2">
                  <span>{isPlaying ? 'Frequência Ativa' : 'Frequência em Espera'}</span>
                  <span>{isPlaying ? 'Sintonizando...' : 'Aguardando Play'}</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                  {isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
                  )}
                </div>
              </div>

              {/* Botão Play/Pause */}
              <div className="flex flex-col items-center gap-6">
                {!isPlaying && (
                  <div className="px-4 py-1 bg-primary text-[10px] font-black rounded-full text-white uppercase tracking-tighter animate-bounce">
                    Clique no Play
                  </div>
                )}
                <button 
                  onClick={toggleAudio}
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
                >
                  {isPlaying ? (
                    <Pause size={40} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play size={40} fill="currentColor" className="ml-2 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resultado e CTA */}
      <div className="mt-24 max-w-2xl text-center space-y-8 pb-20">
        <div className={`text-2xl font-bold tracking-tighter uppercase ${resultColor}`}>
          {resultTitle}
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {resultDescription}
        </p>
        <a href="https://terapiacosmica.tonocosmos.com.br/" target="_blank" rel="noopener noreferrer" className="block pt-8">
          <Button 
            size="lg" 
            className="h-16 px-12 text-xl font-black bg-primary text-white rounded-full glow-primary hover:scale-105 transition-all animate-[pulse-glow_2s_infinite]"
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
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;