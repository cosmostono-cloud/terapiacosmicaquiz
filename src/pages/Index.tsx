import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Bem-vindo à Terapia Cósmica</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Descubra seu caminho para o autoconhecimento e equilíbrio.
        </p>
        <Link to="/funil">
          <Button size="lg" className="px-8 py-4 text-lg">
            Iniciar Jornada Cósmica
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;