import { Link } from "react-router";
import Label from "../../../components/Label";
import BotaoVerde from "../../../components/Botoes/BotaoVerde";
import BotaoBranco from "../../../components/Botoes/BotaoBranco";
import BotaoVoltar from "../../../components/Botoes/BotaoVoltar";
import Titulo from "../../../components/Titulo";

export default function Cadastro() {

  return (
    <div className="flex flex-col items-center pt-40 h-screen bg-fundo">

      <div className="flex justify-center text-center">
        <Titulo texto="Bora tirar aqueles planos do papel? Faça seu cadastro" />
      </div>

      <div className="m-4 flex flex-col items-center">
        <p>
          <Label label_for='titulo' texto='Qual seu nome?' />
          <input id="titulo" type="text" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>

        <p>
          <Label label_for='usuario' texto='Crie seu usuário:' />
          <input id="titulo" type="text" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>

        <p>
          <Label label_for='senha' texto='Crie uma senha:' />
          <input id="titulo" type="password" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>

        <p className="flex p-4 justify-center gap-4 mt-12">
          <BotaoBranco texto='Limpar' type='reset' />
          <BotaoVerde link='/login' type='submit' texto='Criar' />
        </p>
        <BotaoVoltar link="/" texto="Voltar pro Início" />

      </div>

    </div>
  )
}