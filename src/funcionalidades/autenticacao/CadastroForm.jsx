import Titulo from "../../components/Layout/Titulo";
import BotaoVoltar from "../../components/Botoes/BotaoVoltar"

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router"


export default function Cadastro() {
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm()
  let navigate = useNavigate()

  async function cadastrarUsuario(data) {
    const nomeUsuario = data.nomeUsuario
    const senhaUsuario = data.senhaUsuario
    const idadeUsuario = data.idadeUsuario
    const emailUsuario = data.emailUsuario
    const imagemUsuario = data.imagemUsuario
    const saldoUsuario = 0

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeUsuario, senhaUsuario, saldoUsuario, idadeUsuario, emailUsuario, imagemUsuario
        })
      })
      if (!resposta.ok) {
        const text = await resposta.text().catch(() => "")
        throw new Error(`Erro ao cadastrar usuário (status ${resposta.status}) ${text}`)
      }
      const novoUsuario = await resposta.json()
      alert(`✅ Ok! Usuário ${novoUsuario.nomeUsuario} foi cadastrado!`)
      navigate("/login")
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
        <Titulo texto="Bora tirar aqueles planos do papel? Faça seu cadastro" />
      </div>

      <form onSubmit={handleSubmit(cadastrarUsuario)}>

        <div className="m-4 flex flex-col items-center">

          <div>

            <label
              htmlFor='nomeUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Informe seu nome:
            </label>

            <input
              id="nomeUsuario"
              type="text"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("nomeUsuario",
                { required: "O nome é obrigatório" })}
            />
            {errors.nomeUsuario && <span className="text-red-600">{errors.nomeUsuario.message}</span>}
          </div>

          <div>

            <label
              htmlFor='idadeUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Informe sua idade:
            </label>

            <input
              id="idadeUsuario"
              type="text"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("idadeUsuario",
                { required: "Informe sua idade" })}
            />
            {errors.idadeUsuario && <span className="text-red-600">{errors.idadeUsuario.message}</span>}
          </div>

          <div>

            <label
              htmlFor='emailUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Informe seu Email:
            </label>

            <input
              id="emailUsuario"
              type="text"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("emailUsuario",
                { required: "Informe seu Email" })}
            />
            {errors.emailUsuario && <span className="text-red-600">{errors.emailUsuario.message}</span>}
          </div>

          <div>

            <label
              htmlFor='senhaUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Crie uma senha:
            </label>

            <input
              id="senhaUsuario"
              type="password"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("senhaUsuario", {
                required: "A senha é obrigatória",
                minLength: { value: 4, message: "Mínimo de 4 caracteres" }
              })}
            />
            {errors.senhaUsuario && <span className="text-red-600">{errors.senhaUsuario.message}</span>}
          </div>

          <div>

            <label
              htmlFor='imagemUsuario'
              className="text-sm/8 font-medium text-gray-900">
              Informe a URL de sua imagem:
            </label>

            <input
              id="imagemUsuario"
              type="text"
              className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
              {...register("imagemUsuario",
                { required: "Informe sua imagem" })}
            />
            {errors.imagemUsuario && <span className="text-red-600">{errors.imagemUsuario.message}</span>}
          </div>

          <div className="flex p-4 justify-center gap-4 mt-12">

            <input
              className="bg-branco text-textop py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:text-textos hover:outline-1"
              type="reset"
              value='Limpar' />

            <input
              className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-verdeescuro"
              type="submit"
              value="Criar" />

          </div>

        </div>
      </form>
      <BotaoVoltar link="/" texto="Voltar pro Início" />

    </div>
  )
}