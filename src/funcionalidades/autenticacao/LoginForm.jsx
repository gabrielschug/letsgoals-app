import Label from "../../components/ferramentaForms/Label";
import BotaoVerde from "../../components/Botoes/BotaoVerde";
import BotaoBranco from "../../components/Botoes/BotaoBranco";
import BotaoVoltar from "../../components/Botoes/BotaoVoltar";
import Titulo from "../../components/Layout/Titulo";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function Login() {
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm()
  let navigate = useNavigate()
  const [aviso, setAviso] = useState("")

  async function LoginUsuario(data) {
    const nomeUsuario = data.nomeUsuario
    const senhaUsuario = data.senhaUsuario

    try {
      const resposta = await fetch("http://localhost:3000/usuarios")
      if (!resposta.ok) throw new Error("Usuário não cadastrado");
      const dados = await resposta.json()

      //ENCONTRAR usuário no array
      const usuarioEncontrado = dados.find(
        (usuario) =>
          usuario.nomeUsuario === nomeUsuario && usuario.senhaUsuario === senhaUsuario
      );
      if (usuarioEncontrado) {
        setAviso("")
        navigate("/menu")
      } else {
        setAviso('❌ Usuário ou senha incorretos')
      }

    } catch (erro) {
      console.log(`❌ Erro: ${erro.message}`)
    }
    reset()
  }

  useEffect(() => {
    setFocus("nomeUsuario")
  }, [])

  return (
    <div className="flex flex-col items-center pt-40 h-screen bg-fundo">

      <div className="flex justify-center text-center">
        <Titulo texto="Bora acessar sua conta?" />
      </div>

      <form onSubmit={handleSubmit(LoginUsuario)}>


        <div className="m-4 flex flex-col items-center">

          <div>

            <label
              htmlFor='nomeUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Informe seu nome
            </label>

            <input
              id="nomeUsuario"
              type="text"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("nomeUsuario",
                { required: "É necessário informar o seu nome" })}
            />
            {errors.nomeUsuario && <span className="text-red-600">{errors.nomeUsuario.message}</span>}
          </div>

          <div>

            <label
              htmlFor='senhaUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Informe sua senha
            </label>

            <input
              id="senhaUsuario"
              type="password"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("senhaUsuario", {
                required: "É necessário informar sua senha",
                minLength: { value: 4, message: "Mínimo de 4 caracteres" }
              })}
            />
            {errors.senhaUsuario && <span className="text-red-600">{errors.senhaUsuario.message}</span>}

            {aviso &&
              <span className="text-red-600 text-sm">{aviso}</span>
            }
          </div>

          <div className="flex p-4 justify-center gap-4 mt-12">

            <input
              className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-verdeescuro"
              type="submit"
              value="Entrar" />

          </div>



        </div>
      </form>
      <BotaoBranco texto='Crie sua Conta grátis!' link='/cadastro' />
      <BotaoVoltar link="/" texto="Voltar pro Início" />

    </div>
  )
}