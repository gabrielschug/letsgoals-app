import BotaoBrancoLongo from "../../../../components/Botoes/BotaoBrancoLongo"

import { useAuth } from "../../../../context/usuarioContext"

export default function BgCartao() {
  const { usuarioLogado } = useAuth()


  const usuario = usuarioLogado.nomeUsuario
  const valorPoupado = 0

  return (
    <div className=" m-3 p-3 rounded-2xl h-60 bg-gradient-verde text-branco flex flex-col items-center justify-around gap-4">
      <div className="card__container flex justify-between">
        <div className="card__infos flex-col text-center">
          <h3 className="text-xl mt-2 mb-8">Bem-vind@ {usuario}!</h3>
          <div>
            <h4 className="text-lg">Você já poupou</h4>
            <h4 className="text-2xl font-bold">{valorPoupado}</h4>
          </div>
        </div>
        <div className=" flex justify-center items-center w-35 h-35 bg-[#D9D9D9] rounded-full">
          <div className="w-25 h-25 bg-verdeescuro rounded-full"></div>
        </div>
      </div>
      <BotaoBrancoLongo texto="Bora criar uma caixinha" link="/criarmeta" />
    </div>
  )
}