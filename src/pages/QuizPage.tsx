"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showSuccess } from "@/utils/toast";
import { Sparkles } from "lucide-react"; // Importar ícone de brilho

interface Question {
  id: string;
  question: string;
  options?: { text: string; score: number }[];
  type: "text" | "radio";
}

const quizQuestions: Question[] = [
  {
    id: "name",
    question: "Qual é o seu nome?",
    type: "text",
  },
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

// Mapeamento de índices de pergunta para caminhos de imagem
const questionImages: { [key: number]: string } = {
  2: "/images/Image_fx.png", // Para "Você sente que está vivendo no automático...?"
  3: "/images/2.png",
  4: "/images/3.png",
  5: "/images/4.png",
  6: "/images/5.png", // Para "Você sente que carrega dores antigas...?"
  7: "/images/7.png",
  8: "/images/9.png", // Invertido: Agora usa a imagem 9
  9: "/images/8.png", // Invertido: Agora usa a imagem 8
  10: "/images/11.png", // Invertido: Agora usa a imagem 11
  11: "/images/10.png", // Invertido: Agora usa a imagem 10
  12: "/images/12.png", // Para "Você sente que sua autoimagem corresponde...?" (se existir)
  13: "/images/13.png", // Para "Qual dessas frases mais descreve seu momento atual?" (se existir)
};

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentImageSrc = questionImages[currentQuestionIndex];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentQuestion.id === "name") {
      setUserName(e.target.value);
    }
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

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScoreAndRedirect = () => {
    let totalScore = 0;
    quizQuestions.forEach((q) => {
      if (q.type === "radio" && q.options) {
        const selectedOptionText = answers[q.id];
        const selectedOption = q.options.find(opt => opt.text === selectedOptionText);
        if (selectedOption) {
          totalScore += selectedOption.score;
        }
      }
    });

    console.log("Nome:", userName);
    console.log("Pontuação Total:", totalScore);
    console.log("Respostas:", answers);

    // Redireciona para a página de carregamento, passando o nome e a pontuação
    navigate("/loading", { state: { userName, score: totalScore } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-gradient-radial before:from-primary/10 before:to-transparent before:animate-pulse-slow before:z-0">
      <h1 className="text-4xl font-bold text-primary mb-8 z-10">Tô no Cosmos</h1>
      <Card key={currentQuestionIndex} className="w-full max-w-md relative z-10 animate-in fade-in-0 zoom-in-95">
        <CardHeader className="text-center">
          <Sparkles className="mx-auto h-10 w-10 text-primary mb-4" />
          {/* O texto introdutório foi removido conforme solicitado */}
        </CardHeader>
        <CardContent>
          <Label htmlFor={currentQuestion.id} className="mb-4 block text-lg font-medium text-foreground">
            {currentQuestion.question}
          </Label>
          {currentImageSrc && (
            <img 
              src={currentImageSrc} 
              alt={`Imagem para a pergunta ${currentQuestionIndex + 1}`} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            />
          )}
          {currentQuestion.type === "text" && (
            <Input
              id={currentQuestion.id}
              type="text"
              placeholder="Seu nome"
              value={answers[currentQuestion.id] || ""}
              onChange={handleTextChange}
              className="w-full"
            />
          )}
          {currentQuestion.type === "radio" && currentQuestion.options && (
            <RadioGroup
              onValueChange={handleRadioChange}
              value={answers[currentQuestion.id] || ""}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.text} id={`${currentQuestion.id}-${index}`} />
                  <Label htmlFor={`${currentQuestion.id}-${index}`}>{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentQuestionIndex > 0 && (
            <Button variant="outline" onClick={prevQuestion}>
              Anterior
            </Button>
          )}
          <Button onClick={nextQuestion} className="ml-auto">
            {currentQuestionIndex < quizQuestions.length - 1 ? "Próximo" : "Finalizar e Ver Resultado"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizPage;