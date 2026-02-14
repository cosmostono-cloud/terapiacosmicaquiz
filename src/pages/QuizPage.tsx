"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showSuccess } from "@/utils/toast";
import { Sparkles, ShieldCheck, Zap, Brain, Star, ArrowRight } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options?: { text: string; score: number }[];
  type: "text" | "radio";
}

const quizQuestions: Question[] = [
  { id: "name", question: "Qual é o seu nome?", type: "text" },
  {
    id: "age",
    question: "Qual é a sua idade?",
    type: "radio",
    options: [
      { text: "18-25 anos", score: 0 },
      { text: "26-35 anos", score: 0 },
      { text: "36-45 anos", score: 0 },
      { text: "46-55 anos", score: 0 },
      { text: "56+ anos", score: 0 },
    ],
  },
  {
    id: "vivendo-no-automatico",
    question: "Você sente que está vivendo no automático ou consegue estar presente no dia a dia?",
    type: "radio",
    options: [
      { text: "Sempre no automático", score: 10 },
      { text: "Às vezes presente", score: 5 },
      { text: "Geralmente presente", score: 0 },
    ],
  },
  {
    id: "travado",
    question: "Com que frequência você sente que algo dentro de você está “travado”?",
    type: "radio",
    options: [
      { text: "Quase todos os dias", score: 10 },
      { text: "Às vezes", score: 5 },
      { text: "Raramente", score: 0 },
    ],
  },
  {
    id: "energia-emocional",
    question: "Como está sua energia emocional hoje?",
    type: "radio",
    options: [
      { text: "Instável", score: 10 },
      { text: "Mediana", score: 5 },
      { text: "Equilibrada", score: 0 },
    ],
  },
  {
    id: "expressa-quem-realmente-e",
    question: "Você sente que expressa quem realmente é, sem medo de julgamentos?",
    type: "radio",
    options: [
      { text: "Quase nunca", score: 10 },
      { text: "Às vezes", score: 5 },
      { text: "Sim, na maior parte do tempo", score: 0 },
    ],
  },
  {
    id: "dores-antigas",
    question: "Você sente que carrega dores antigas ou memórias que ainda influenciam sua vida atual?",
    type: "radio",
    options: [
      { text: "Sim, claramente", score: 10 },
      { text: "Talvez", score: 5 },
      { text: "Acho que não", score: 0 },
    ],
  },
  {
    id: "relacao-espiritualidade",
    question: "Como está sua relação com sua espiritualidade?",
    type: "radio",
    options: [
      { text: "Distante", score: 10 },
      { text: "Em busca de conexão", score: 5 },
      { text: "Conectada", score: 0 },
    ],
  },
  {
    id: "merecedora",
    question: "Você se sente merecedora das coisas boas que deseja?",
    type: "radio",
    options: [
      { text: "Quase nunca", score: 10 },
      { text: "Às vezes", score: 5 },
      { text: "Sim", score: 0 },
    ],
  },
  {
    id: "esgotada",
    question: "Quantas vezes por semana você se sente esgotada emocionalmente ou energeticamente?",
    type: "radio",
    options: [
      { text: "4+ vezes", score: 10 },
      { text: "1 a 3 vezes", score: 5 },
      { text: "Quase nunca", score: 0 },
    ],
  },
  {
    id: "clareza-proximos-passos",
    question: "Você sente clareza sobre seus próximos passos na vida?",
    type: "radio",
    options: [
      { text: "Nada clara", score: 10 },
      { text: "Parcial", score: 5 },
      { text: "Bem clara", score: 0 },
    ],
  },
  {
    id: "algo-da-errado",
    question: "Quando algo dá errado, você costuma…",
    type: "radio",
    options: [
      { text: "Se culpar", score: 10 },
      { text: "Ficar perdida", score: 5 },
      { text: "Respirar e resolver", score: 0 },
    ],
  },
  {
    id: "autoimagem-elevada",
    question: "Você sente que sua autoimagem corresponde à sua versão mais elevada?",
    type: "radio",
    options: [
      { text: "Não", score: 10 },
      { text: "Em processo", score: 5 },
      { text: "Sim", score: 0 },
    ],
  },
  {
    id: "momento-atual",
    question: "Qual dessas frases mais descreve seu momento atual?",
    type: "radio",
    options: [
      { text: "Estou cansada e preciso de ajuda", score: 10 },
      { text: "Quero mudar, mas não sei como", score: 5 },
      { text: "Já estou em transformação e quero dar o próximo passo", score: 0 },
    ],
  },
];

const QuizPage = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentQuestion.id === "name") setUserName(e.target.value);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }));
  };

  const handleRadioChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion.type === "text" && !answers[currentQuestion.id]?.trim()) {
      showSuccess("Por favor, insira seu nome.");
      return;
    }
    if (currentQuestion.type === "radio" && !answers[currentQuestion.id]) {
      showSuccess("Por favor, selecione uma opção.");
      return;
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateScoreAndRedirect();
    }
  };

  const calculateScoreAndRedirect = () => {
    let totalScore = 0;
    quizQuestions.forEach((q) => {
      if (q.type === "radio" && q.options) {
        const selectedOption = q.options.find(opt => opt.text === answers[q.id]);
        if (selectedOption) totalScore += selectedOption.score;
      }
    });
    navigate("/loading", { state: { userName, score: totalScore } });
  };

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-background text-white overflow-x-hidden">
        <div className="nebula-bg" />
        
        {/* Hero Section */}
        <div className="w-full max-w-5xl px-6 pt-20 pb-32 flex flex-col items-center text-center">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-secondary/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
            <img 
              src="/images/cerebro-quantico.png" 
              alt="Cérebro Quântico" 
              className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full border-2 border-white/10 relative z-10 shadow-[0_0_60px_rgba(168,85,247,0.3)]"
            />
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
            A Terapia Cósmica <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              não é motivação.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-medium">
            É reprogramação interna guiada para clareza e destrave emocional.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { icon: <ShieldCheck size={16} />, text: "CLAREZA IMEDIATA" },
              { icon: <Zap size={16} />, text: "DESTRAVE EMOCIONAL" },
              { icon: <Star size={16} />, text: "REALINHAMENTO" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest uppercase">
                <span className="text-primary">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>

          <Button 
            onClick={() => setStarted(true)}
            className="h-20 px-12 text-xl md:text-2xl font-black rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all glow-lilac group"
          >
            QUERO IR PARA O PRÓXIMO NÍVEL <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>

        {/* Section: Por que afirmações não funcionam */}
        <div className="w-full max-w-6xl px-6 py-24 bg-white/[0.02] border-y border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Por que afirmações não <br /> funcionam para muita gente?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Você repete que é próspero, mas sua conta continua igual. Você diz que é confiante, mas treme por dentro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-white/5 p-8">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">A Mente Consciente (5%)</h3>
              <p className="text-muted-foreground leading-relaxed">
                É onde você toma decisões lógicas e faz planos. É a ponta do iceberg, fraca demais para vencer hábitos de décadas.
              </p>
            </Card>

            <Card className="glass-card border-primary/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="text-primary opacity-50" size={24} />
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">O Subconsciente (95%)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Onde residem as emoções gravadas e os programas herdados. É o piloto automático que realmente dirige sua vida.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="nebula-bg" />
      
      <div className="absolute top-10 px-4 py-1 border border-primary/50 rounded-full bg-primary/10 text-[10px] tracking-[0.2em] font-bold text-primary flex items-center gap-2 uppercase z-20">
        <Sparkles size={12} /> Nível 1: A Descoberta
      </div>

      <Card className="w-full max-w-md glass-card relative z-10 animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center pt-12">
          <div className="w-full bg-white/5 h-1 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" 
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent>
          <Label className="mb-6 block text-xl font-bold text-white leading-snug">
            {currentQuestion.question}
          </Label>
          
          {currentQuestion.type === "text" ? (
            <Input
              placeholder="Seu nome"
              value={answers[currentQuestion.id] || ""}
              onChange={handleTextChange}
              className="h-14 bg-white/5 border-white/10 text-lg focus:border-primary/50 transition-all"
            />
          ) : (
            <RadioGroup
              onValueChange={handleRadioChange}
              value={answers[currentQuestion.id] || ""}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="relative">
                  <RadioGroupItem 
                    value={option.text} 
                    id={`${currentQuestion.id}-${index}`} 
                    className="peer sr-only"
                  />
                  <Label 
                    htmlFor={`${currentQuestion.id}-${index}`}
                    className="flex items-center p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:bg-white/10"
                  >
                    <div className="w-4 h-4 rounded-full border border-white/30 mr-3 flex items-center justify-center peer-data-[state=checked]:border-primary">
                      <div className="w-2 h-2 rounded-full bg-primary scale-0 transition-transform peer-data-[state=checked]:scale-100"></div>
                    </div>
                    <span className="text-white font-medium">{option.text}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pb-8">
          {currentQuestionIndex > 0 && (
            <Button variant="ghost" onClick={() => setCurrentQuestionIndex(prev => prev - 1)} className="text-muted-foreground hover:text-white">
              Anterior
            </Button>
          )}
          <Button 
            onClick={nextQuestion} 
            className="ml-auto h-12 px-8 bg-primary text-white hover:bg-primary/90 glow-lilac font-bold rounded-xl"
          >
            {currentQuestionIndex < quizQuestions.length - 1 ? "Próximo" : "Ver Resultado"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizPage;