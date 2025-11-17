import { useEffect, useState } from "react";

export default function passarFotos() {
  const imagens = [
    "/anuncios_formatura.png",
    "/anuncios_aluguel.png",
    "/anuncios_casamento.png",
    "/anuncios_viagem.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-60 overflow-hidden mx-auto">
      <img
        src={imagens[index]}
        alt="slide"
        className="w-full h-full object-cover transition-opacity duration-700"
      />
    </div>
  );
}