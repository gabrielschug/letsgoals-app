import BotaoBrancoLongo from "./BotaoBrancoLongo"



export default function BgCartao() {

  const usuario = 'Fulano'
  const VALOR_POUPADO = 1_542.83
  const valorPoupado = VALOR_POUPADO.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className=" m-3 p-6 rounded-2xl h-60 bg-gradient-verde text-branco flex flex-col items-center justify-around gap-4">
      <div className="card__container flex justify-between">
        <div className="card__infos flex-col text-center">
          <h3 className="text-xl mt-2 mb-8">Bem-vindo {usuario}!</h3>
          <div>
            <h4 className="text-lg">Você já poupou</h4>
            <h4 className="text-2xl font-bold">{valorPoupado}</h4>
          </div>
        </div>
        <div className=" flex justify-center items-center w-35 h-35 bg-[#D9D9D9] rounded-full">
          <div className="w-25 h-25 bg-verdeescuro rounded-full"></div>
        </div>
      </div>
      <BotaoBrancoLongo />
    </div>
  )
}