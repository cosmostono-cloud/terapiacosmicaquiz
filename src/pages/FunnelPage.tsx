"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

const FunnelPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    intention: "",
    previousExperience: "",
    expectations: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    // Basic validation for current step
    if (step === 1 && !formData.name) {
      showSuccess("Por favor, insira seu nome.");
      return;
    }
    if (step === 2 && (!formData.age || isNaN(Number(formData.age)))) {
      showSuccess("Por favor, insira uma idade válida.");
      return;
    }
    if (step === 3 && !formData.intention) {
      showSuccess("Por favor, selecione sua intenção principal.");
      return;
    }
    if (step === 4 && !formData.previousExperience) {
      showSuccess("Por favor, selecione sua experiência prévia.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // In a real application, you would send formData to a backend here.
    console.log("Dados do funil:", formData);
    showSuccess("Obrigado por preencher o funil! Redirecionando...");
    setTimeout(() => {
      window.location.href = "https://terapiacosmica.tonocosmos.com.br/";
    }, 1500); // Redirect after a short delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Funil de Terapia Cósmica</CardTitle>
          <CardDescription className="text-center">
            Passo {step} de 5
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div>
              <Label htmlFor="name" className="mb-2 block">Qual é o seu nome?</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <Label htmlFor="age" className="mb-2 block">Qual é a sua idade?</Label>
              <Input
                id="age"
                type="number"
                placeholder="Sua idade"
                value={formData.age}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <Label className="mb-2 block">Qual é a sua intenção principal ao buscar a Terapia Cósmica?</Label>
              <RadioGroup
                onValueChange={(value) => handleRadioChange("intention", value)}
                value={formData.intention}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="autoconhecimento" id="intention-1" />
                  <Label htmlFor="intention-1">Autoconhecimento e Crescimento Pessoal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cura-emocional" id="intention-2" />
                  <Label htmlFor="intention-2">Cura Emocional e Liberação de Bloqueios</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conexao-espiritual" id="intention-3" />
                  <Label htmlFor="intention-3">Conexão Espiritual e Propósito de Vida</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equilibrio-energetico" id="intention-4" />
                  <Label htmlFor="intention-4">Equilíbrio Energético e Bem-estar Geral</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div>
              <Label className="mb-2 block">Você tem alguma experiência prévia com terapias holísticas ou espirituais?</Label>
              <RadioGroup
                onValueChange={(value) => handleRadioChange("previousExperience", value)}
                value={formData.previousExperience}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim-muita" id="experience-1" />
                  <Label htmlFor="experience-1">Sim, muita experiência</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim-pouca" id="experience-2" />
                  <Label htmlFor="experience-2">Sim, pouca experiência</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao-nenhuma" id="experience-3" />
                  <Label htmlFor="experience-3">Não, nenhuma experiência</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div>
              <Label htmlFor="expectations" className="mb-2 block">Quais são suas expectativas em relação à Terapia Cósmica?</Label>
              <Textarea
                id="expectations"
                placeholder="Descreva suas expectativas..."
                value={formData.expectations}
                onChange={handleChange}
                className="w-full min-h-[100px]"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Anterior
            </Button>
          )}
          {step < 5 && (
            <Button onClick={nextStep} className="ml-auto">
              Próximo
            </Button>
          )}
          {step === 5 && (
            <Button onClick={handleSubmit} className="ml-auto">
              Finalizar e Ir para a Terapia Cósmica
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FunnelPage;