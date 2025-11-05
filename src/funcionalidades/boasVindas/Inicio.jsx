import { Link } from "react-router";
import BotaoVerde from "../../components/Botoes/BotaoVerde";
import BotaoBranco from "../../components/Botoes/BotaoBranco";

export default function Inicio() {

  return (
    <div className="bg-fundo h-screen flex flex-col  pt-40 items-center">
      <p>Seja Bem-vind@ ao</p>
      <h1 className="text-5xl font-bold">LetsGoals!</h1>
      <p>Onde seus sonhos se tornam objetivos</p>
      <img className="mt-8 mb-8 w-40" src="icone_caixa.png" />
      <BotaoVerde link="/login" texto="Entrar" />

      <p className="mt-8 mb-4">Ainda não tem Cadastro?</p>
      <BotaoBranco texto='Crie sua Conta grátis!' link='/cadastro' />

    </div>
  )
}