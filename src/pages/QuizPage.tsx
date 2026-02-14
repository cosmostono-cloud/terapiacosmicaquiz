"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showSuccess } from "@/utils/toast";
import { Sparkles } from "lucide-react";

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

const questionImages: { [key: number]: string } = {
  2: "/images/Image_fx.png",
  3: "/images/2.png",
  4: "/images/3.png",
  5: "/images/4.png",
  6: "/images/5.png",
  7: "/images/7.png",
  8: "/images/9.png",
  9: "/images/8.png",
  10: "/images/11.png",
  11: "/images/10.png",
  12: "/images/Image_fx (2).png",
  13: "/images/pensamento.png",
};

const QuizPage = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentImageSrc = questionImages[currentQuestionIndex];

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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="nebula-bg" />
        
        <div className="absolute top-10 px-4 py-1 border border-primary/50 rounded-full bg-primary/10 text-[10px] tracking-[0.2em] font-bold text-primary flex items-center gap-2 uppercase">
          <Sparkles size={12} /> Nível 1: A Descoberta
        </div>
        
        <div className="relative mb-12 mt-20">
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full animate-pulse delay-700"></div>
          <img 
            src="/images/Image_fx.png" 
            alt="Consciência" 
            className="w-64 h-64 object-cover rounded-full border-2 border-primary/30 relative z-10 shadow-[0_0_50px_rgba(168,85,247,0.4)]"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight max-w-3xl">
          Descubra Quem Está <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
            Dirigindo Sua Realidade
          </span>
        </h1>

        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Em menos de 2 minutos você vai descobrir qual força invisível está moldando seus resultados agora.
        </p>

        <Button 
          onClick={() => setStarted(true)}
          className="h-16 px-10 text-xl font-bold rounded-full bg-white text-black hover:bg-white/90 transition-all glow-lilac group"
        >
          👉 FAZER TESTE GRATUITO
        </Button>

        <div className="grid grid-cols-3 gap-4 mt-16 w-full max-w-md">
          {["RÁPIDO", "PRECISO", "GRATUITO"].map((item) => (
            <div key={item} className="py-2 border border-white/10 rounded-lg bg-white/5 text-[10px] tracking-widest font-bold text-muted-foreground">
              {item}
            </div>
          ))}
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
          
          {currentImageSrc && (
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-secondary/20 transition-all"></div>
              <img 
                src={currentImageSrc} 
                alt="Visual" 
                className="w-full h-56 object-cover rounded-2xl border border-white/10 relative z-10" 
              />
            </div>
          )}

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