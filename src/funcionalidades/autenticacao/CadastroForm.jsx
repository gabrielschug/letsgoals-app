import { Link } from "react-router";
import Label from "../../components/ferramentaForms/Label";
import BotaoVerde from "../../components/Botoes/BotaoVerde";
import BotaoBranco from "../../components/Botoes/BotaoBranco";
import BotaoVoltar from "../../components/Botoes/BotaoVoltar";
import Titulo from "../../components/Layout/Titulo";
import Input from "../../components/ferramentaForms/Input";

import { useForm } from "react-hook-form";

export default function Cadastro() {

  const { register, handleSubmit } = useForm()

  const cadastrarUsuario = (data) => { alert(JSON.stringify(data)) }

  return (
    <div className="flex flex-col items-center pt-40 h-screen bg-fundo">

      <div className="flex justify-center text-center">
        <Titulo texto="Bora tirar aqueles planos do papel? Faça seu cadastro" />
      </div>

      <form onSubmit={handleSubmit(cadastrarUsuario)}>

        <div className="m-4 flex flex-col items-center">
          <p>
            <Label label_for='titulo' texto='Qual seu nome?' />
            <Input id="titulo" type="text" name="titulo" {...register("titulo")} />
          </p>

          <p>
            <Label label_for='usuario' texto='Crie seu usuário:' />
            <Input id="usuario" type="text" name="usuario" {...register("usuario")} />
          </p>

          <p>
            <Label label_for='senha' texto='Crie uma senha:' />
            <Input id="senha" type="text" name="senha" {...register("senha")} />
          </p>

          <p className="flex p-4 justify-center gap-4 mt-12">
            <BotaoBranco texto='Limpar' type='reset' />
            <BotaoVerde type='submit' texto='Criar' />
          </p>
          <BotaoVoltar link="/" texto="Voltar pro Início" />

        </div>
      </form>

    </div>
  )
}