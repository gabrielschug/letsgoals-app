import "../../styles/input.css"

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import Titulo from "../../components/Layout/Titulo";
import BotaoVoltar from "../../components/Botoes/BotaoVoltar";

import { useAuth } from "../../context/usuarioContext"

export default function CriarMetaForm() {
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { usuarioLogado, isAuthLoading } = useAuth()

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }
    if (usuarioLogado) {
      setFocus("metaTitulo")
    } else {
      navigate("/login")
    }
  }, [isAuthLoading, usuarioLogado, setFocus, navigate])

  async function criarMeta(data) {
    if (!usuarioLogado) return // SEGURANÇA - sem usuario = sem Interface

    const liderId = usuarioLogado.id
    const titulo = data.titulo
    const valorAlvo = data.valorAlvo
    const valorInicial = data.valorInicial
    const periodoConclusao = data.periodoConclusao
    const linkConvite = String(Math.floor(Math.random() * 9999))

    try {
      const resposta = await fetch("http://localhost:3000/metas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          liderId, titulo, valorAlvo, valorInicial, periodoConclusao, "status": "ativo", "linkConvite": linkConvite
        })
      })
      if (!resposta.ok) throw new Error("Erro ao cadastrar a meta");

      const novaMeta = await resposta.json()
      alert(`✅ Ok! a Meta ${novaMeta.titulo} foi criada!`)
      navigate("/home")

    } catch (error) {
      console.log(`❌ Erro: ${error.message}`)
    }
    reset()
  }


  if (isAuthLoading) {
    return <p className="pt-40 text-center">Carregando...</p>
  }

  if (!usuarioLogado) {
    return <p className="pt-40 text-center">Você precisa estar logado para ver esta página. Redirecionando...</p>
  }

  return (
    <div className="container  flex flex-col items-center pt-40 h-screen" >

      <div className="flex justify-center text-center">
        <Titulo texto="Bora Criar uma Meta Coletiva!" />
      </div>

      <form onSubmit={handleSubmit(criarMeta)}>

        <div className="form__input  m-4 flex flex-col items-center">

          <label
            htmlFor="titulo"
            className="text-sm/8 font-medium text-gray-900">
            Dê um nome à sua meta:
          </label>

          <input
            id="titulo"
            type="text"
            name="metaTitulo"
            className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
            {...register("metaTitulo",
              { required: "Sua meta precisa de um nome" })}
          />
          {errors.metaTitulo && <span className="text-red-600">{errors.metaTitulo.message}</span>}
        </div>

        <div className="form__input  m-4 flex flex-col items-center">

          <label
            htmlForfor="metaTotal"
            className="text-sm/8 font-medium text-gray-900">
            Qual valor que você pretende obter no total?
          </label>

          <input
            id="valorAlvo"
            type="text"
            name="metaTotal"
            className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
            {...register("metaTotal",
              { required: "Você precisa indicar um valor final" })}
          />
          {errors.metaTitulo && <span className="text-red-600">{errors.metaTitulo.message}</span>}
        </div>

        <div className="form__input  m-4 flex flex-col items-center">

          <label
            htmlForfor="metaValorInicial"
            className="text-sm/8 font-medium text-gray-900">
            Qual valor você irá iniciar esta meta?
          </label>

          <input
            id="valorInicial"
            type="decimal"
            name="metaValorInicial"
            className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
            {...register("metaValorInicial",
              { required: "A meta não pode iniciar vazia..." })}
          />
          {errors.metaTitulo && <span className="text-red-600">{errors.metaTitulo.message}</span>}
        </div>


        <div className="form__select m-4 flex flex-col items-center">
          <div>

            <label
              htmlForfor="periodoConclusao"
              className="text-sm/8 font-medium text-gray-900">
              Quantos meses você concluirá a meta?
            </label>

            <div className="grid grid-cols-1 m-0">

              <select
                id="periodoConclusao"
                name="periodoConclusao"
                autocomplete="periodoConclusao"
                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-2 pr-4 pl-4 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-verdescuro"
                {...register("periodoConclusao")}>
                <option className="text-sm">Selecione um período</option>
                <option value="3" className="text-sm">3 meses</option>
                <option value="6" className="text-sm">6 meses</option>
                <option value="9" className="text-sm">9 meses</option>
                <option value="12" className="text-sm">1 ano</option>
                <option value="24" className="text-sm">2 anos</option>
              </select>

              <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
              </svg>

            </div>
          </div>
        </div>

        <div className="form__botoes  flex p-4 justify-center gap-4 mt-12">

          <input
            className=" bg-branco text-textop py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:text-textos hover:outline-1"
            type="reset"
            value="Limpar" />

          <input
            className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-verdeescuro"
            type="submit"
            value="Criar Meta" />
        </div>

      </form>
      <BotaoVoltar link="/home" texto="Voltar para Página Inicial" />

    </div >
  )
}