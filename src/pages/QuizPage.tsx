"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showSuccess } from "@/utils/toast";

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
    id: "desequilibrio",
    question: "Com que frequência você se sente em desequilíbrio ou com a energia baixa?",
    type: "radio",
    options: [
      { text: "Nunca ou raramente", score: 0 },
      { text: "Às vezes", score: 5 },
      { text: "Frequentemente", score: 10 },
      { text: "Quase sempre", score: 15 },
      { text: "Constantemente", score: 20 },
    ],
  },
  {
    id: "mudancas",
    question: "Como você lida com mudanças inesperadas na vida?",
    type: "radio",
    options: [
      { text: "Com muita facilidade e adaptação", score: 0 },
      { text: "Bem, consigo me ajustar", score: 5 },
      { text: "Com alguma dificuldade, mas supero", score: 10 },
      { text: "Com muita dificuldade e resistência", score: 15 },
      { text: "Sinto-me paralisado(a)", score: 20 },
    ],
  },
  {
    id: "intuicao",
    question: "Qual o seu nível de conexão com sua intuição ou 'voz interior'?",
    type: "radio",
    options: [
      { text: "Muito conectado(a), confio plenamente", score: 0 },
      { text: "Conectado(a), mas às vezes duvido", score: 5 },
      { text: "Neutro, não presto muita atenção", score: 10 },
      { text: "Desconectado(a), sinto que não tenho", score: 15 },
      { text: "Completamente desconectado(a)", score: 20 },
    ],
  },
  {
    id: "proposito",
    question: "Com que frequência você sente que está vivendo seu propósito de vida?",
    type: "radio",
    options: [
      { text: "Diariamente, com clareza", score: 0 },
      { text: "Frequentemente, tenho uma boa ideia", score: 5 },
      { text: "Às vezes, mas ainda busco", score: 10 },
      { text: "Raramente, sinto-me perdido(a)", score: 15 },
      { text: "Nunca, não sei qual é meu propósito", score: 20 },
    ],
  },
  {
    id: "perdao",
    question: "Como você descreveria sua capacidade de perdoar a si mesmo(a) e aos outros?",
    type: "radio",
    options: [
      { text: "Muito fácil, pratico o perdão", score: 0 },
      { text: "Fácil, consigo perdoar na maioria das vezes", score: 5 },
      { text: "Moderado, às vezes é um desafio", score: 10 },
      { text: "Difícil, guardo ressentimentos", score: 15 },
      { text: "Muito difícil, não consigo perdoar", score: 20 },
    ],
  },
  {
    id: "paz",
    question: "Com que frequência você se sente em paz e harmonia consigo mesmo(a)?",
    type: "radio",
    options: [
      { text: "Quase sempre", score: 0 },
      { text: "Frequentemente", score: 5 },
      { text: "Às vezes", score: 10 },
      { text: "Raramente", score: 15 },
      { text: "Nunca", score: 20 },
    ],
  },
  {
    id: "estresse",
    question: "Como você reage a situações de estresse ou ansiedade?",
    type: "radio",
    options: [
      { text: "Mantenho a calma e encontro soluções", score: 0 },
      { text: "Sinto um pouco de estresse, mas gerencio", score: 5 },
      { text: "Fico ansioso(a), mas consigo seguir em frente", score: 10 },
      { text: "Sinto-me sobrecarregado(a) e com dificuldade", score: 15 },
      { text: "Entro em pânico ou desespero", score: 20 },
    ],
  },
  {
    id: "abundancia",
    question: "Qual a sua percepção sobre a abundância em sua vida (não apenas financeira)?",
    type: "radio",
    options: [
      { text: "Sinto-me abundante em todas as áreas", score: 0 },
      { text: "Sinto abundância na maioria das áreas", score: 5 },
      { text: "Tenho algumas áreas de abundância, outras não", score: 10 },
      { text: "Sinto falta de abundância em muitas áreas", score: 15 },
      { text: "Sinto escassez em quase tudo", score: 20 },
    ],
  },
  {
    id: "gratidao",
    question: "Com que frequência você se sente grato(a) pelas coisas em sua vida?",
    type: "radio",
    options: [
      { text: "Diariamente, pratico a gratidão", score: 0 },
      { text: "Frequentemente, sou grato(a)", score: 5 },
      { text: "Às vezes, quando me lembro", score: 10 },
      { text: "Raramente, foco mais nos problemas", score: 15 },
      { text: "Nunca, sinto que não tenho motivos", score: 20 },
    ],
  },
  {
    id: "saude-energetica",
    question: "Como você se sente em relação ao seu corpo e sua saúde energética?",
    type: "radio",
    options: [
      { text: "Muito bem, sinto-me vital e equilibrado(a)", score: 0 },
      { text: "Bem, com boa saúde geral", score: 5 },
      { text: "Neutro, tenho altos e baixos", score: 10 },
      { text: "Não muito bem, sinto desequilíbrios", score: 15 },
      { text: "Mal, com muitos problemas energéticos/físicos", score: 20 },
    ],
  },
  {
    id: "abertura-espiritual",
    question: "Qual o seu nível de abertura para novas perspectivas e conhecimentos espirituais?",
    type: "radio",
    options: [
      { text: "Totalmente aberto(a) e curioso(a)", score: 0 },
      { text: "Aberto(a) e interessado(a)", score: 5 },
      { text: "Um pouco aberto(a), mas cético(a)", score: 10 },
      { text: "Pouco aberto(a), prefiro o que já conheço", score: 15 },
      { text: "Fechado(a), não acredito", score: 20 },
    ],
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }));
  };

  const handleRadioChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion.type === "text" && !userName.trim()) {
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
    const maxPossibleScore = (quizQuestions.length - 1) * 20; // 11 scored questions * 20 max points each

    quizQuestions.forEach((q) => {
      if (q.type === "radio" && answers[q.id] && q.options) {
        const selectedOption = q.options.find((opt) => opt.text === answers[q.id]);
        if (selectedOption) {
          totalScore += selectedOption.score;
        }
      }
    });

    const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);

    console.log("Nome:", userName);
    console.log("Respostas:", answers);
    console.log("Pontuação total:", totalScore);
    console.log("Pontuação normalizada (0-100):", normalizedScore);

    showSuccess(`Olá ${userName}, sua pontuação é ${normalizedScore}/100. Redirecionando para a Terapia Cósmica...`);
    setTimeout(() => {
      window.location.href = "https://terapiacosmica.tonocosmos.com.br/";
    }, 2000); // Redirect after a short delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Descubra Seu Caminho</CardTitle>
          <CardDescription className="text-center">
            {currentQuestionIndex + 1} de {quizQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor={currentQuestion.id} className="mb-4 block text-lg font-medium">
            {currentQuestion.question}
          </Label>
          {currentQuestion.type === "text" && (
            <Input
              id={currentQuestion.id}
              type="text"
              placeholder="Seu nome"
              value={userName}
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