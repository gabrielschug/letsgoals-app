import { useEffect, useState } from "react";

export default function passarFotos() {
  const imagens = [
    "https://st2.depositphotos.com/3725083/5485/i/450/depositphotos_54856347-stock-photo-travel-the-world-monument-concept.jpg",
    "https://www.psicologoeterapia.com.br/wp-content/uploads/sonhos-parte-1.jpg",
    "https://www.mensagemdeformatura.com/wp-content/uploads/2017/09/aneis-de-formatura-tricurioso-1-1-655x400-1.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-3 w-[1320px] h-[450px] overflow-hidden rounded-xl mx-auto">
      <img
        src={imagens[index]}
        alt="slide"
        className="w-full h-full object-cover transition-opacity duration-700"
      />
    </div>
  );
}