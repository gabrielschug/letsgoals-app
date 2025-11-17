import BotaoBrancoLongo from "../../../../components/Botoes/BotaoBrancoLongo";
import FormatarReais from "../../../../components/Layout/FormatarReais";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/usuarioContext";

export default function BgCartao() {
  const { usuarioLogado } = useAuth();
  const [contribuido, setContribuido] = useState(0);

  useEffect(() => {
    if (usuarioLogado) {
      fetch(`http://localhost:3000/contribuicoes?usuarioId=${usuarioLogado.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar contribuições");
          }
          return response.json();
        })
        .then((data) => {
          const total = data.reduce((acc, contribuicao) => acc + contribuicao.valor, 0);
          setContribuido(total);
        })
        .catch((error) => {
          console.error("Erro ao buscar contribuições:", error);
        });
    }
  }, [usuarioLogado]);

  const usuario = usuarioLogado?.nomeUsuario || "Usuário";

  return (
    <div className="m-3 p-3 rounded-2xl h-60 bg-gradient-verde text-branco flex flex-col items-center justify-around gap-4">
      <div className="card__container flex justify-between">
        <div className="card__infos flex-col text-center">
          <h3 className="text-xl mt-2 mb-8">Bem-vind@ {usuario}!</h3>
          <div>
            <h4 className="text-lg">Você já contribuiu</h4>
            <h4 className="text-2xl font-bold">
              <FormatarReais valor={contribuido} />
            </h4>
          </div>
        </div>
        <div className="flex justify-center items-center w-35 h-35 bg-[#D9D9D9] rounded-full">
          <div className="w-25 h-25 bg-verdeescuro rounded-full"></div>
        </div>
      </div>
      <BotaoBrancoLongo texto="Bora criar uma Meta" link="/criarmeta" />
    </div>
  );
}