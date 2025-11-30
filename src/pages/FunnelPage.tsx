"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider"; // Importar Slider
import { showSuccess } from "@/utils/toast";

const FunnelPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "18", // Valor inicial para o slider
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-foreground">Sua Jornada de Autodescoberta</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Passo {step} de 5
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div>
              <Label htmlFor="name" className="mb-2 block text-foreground">Qual é o seu nome?</Label>
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
              <Label htmlFor="age" className="mb-4 block text-foreground">Qual é a sua idade? {formData.age ? `${formData.age} anos` : ""}</Label>
              <Slider
                id="age"
                min={18}
                max={99}
                step={1}
                value={[Number(formData.age)]}
                onValueChange={(value) => handleRadioChange("age", String(value[0]))}
                className="w-full"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <Label className="mb-2 block text-foreground">Qual é a sua intenção principal ao iniciar esta jornada?</Label>
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
              <Label className="mb-2 block text-foreground">Você tem alguma experiência prévia com práticas holísticas ou espirituais?</Label>
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
              <Label htmlFor="expectations" className="mb-2 block text-foreground">Quais são suas expectativas em relação a esta jornada?</Label>
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
              Finalizar e Continuar
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FunnelPage;