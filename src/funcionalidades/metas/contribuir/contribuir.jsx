// REACT E NEXT IMPORTS ---------------------------------------------------------
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useAuth } from '../../../context/usuarioContext'
import { useNavigate } from 'react-router'

// COMPONENTES ------------------------------------------------------------------
import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import Titulo from '../../../components/Layout/Titulo'
import FormatarReais from '../../../components/Layout/FormatarReais'
import Subtitulo from '../../../components/Layout/Subtitulo'

// COMPONENTE PRINCIPAL ----------------------------------------------------------
export default function Contribuir() {

  // VARIAVEIS E FUNÇÕES GERAIS -------------------------------------------------
  const { usuarioLogado, isAuthLoading } = useAuth()
  const { register, reset, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [metasUsuario, setMetasUsuario] = React.useState([])
  const [saldoMeta, setSaldoMeta] = useState(0);
  const [metaContribuida, setMetaContribuida] = useState('');
  const [MostrarMensagemContribuicao, setMostrarMensagemContribuicao] = useState(false);
  const [valorAlvoMeta, setValorAlvoMeta] = useState(0);

  // INICIALIZAÇÃO DA PÁGINA ---------------------------------------------------
  useEffect(() => {
    if (isAuthLoading) {
      return;
    }
    if (usuarioLogado) {
      // Requisita as participações do usuário logado
      fetch(`http://localhost:3000/participacoes?usuarioId=${usuarioLogado.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar participações do usuário");
          }
          return response.json();
        })
        .then((participacoes) => {
          // Extrai os IDs das Metas que o usuário participa
          const metaIds = participacoes.map((p) => p.metaId);

          // Requisita as Metas do usuário com base nos IDs
          const promises = metaIds.map((id) =>
            fetch(`http://localhost:3000/metas/${id}`)
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`Erro ao buscar meta com ID ${id}`);
                }
                return res.json();
              })
          );
          Promise.all(promises)
            .then((metas) => setMetasUsuario(metas))
            .catch((error) => console.error("Erro ao carregar metas:", error));
        })
        .catch((error) => console.error("Erro ao carregar participações:", error));

    } else {
      navigate("/login");
    }
  }, [isAuthLoading, usuarioLogado, navigate]);



  // REGISTRO DA CONTRIBUIÇÃO ----------------------------------------------------

  async function registrarContribuicao(data) {
    if (!usuarioLogado) return;

    // Criando variáveis para a envio
    const meta = data.meta;
    const valor = data.valor;
    const datahora = new Date().toISOString();

    try {
      const resposta = await fetch('http://localhost:3000/contribuicoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metaId: meta,
          usuarioId: usuarioLogado.id,
          valor: parseFloat(valor),
          data: datahora,
        }),
      });
      // Ajustei a lógica para verificar se o saldo atualizado da meta atinge o valor alvo após a nova contribuição.
      const saldoAtualizado = saldoMeta + parseFloat(valor);
      if (saldoAtualizado === valorAlvoMeta) {
        // Atualiza o status da meta para 'concluida'
        await fetch(`http://localhost:3000/metas/${meta}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'Concluída',
          }),
        });
      }
      if (!resposta.ok) {
        throw new Error('Erro ao registrar contribuição');
      }

      // Requisitar o título da meta contribuída
      const metaContribuidaData = metasUsuario.find((m) => m.id === meta);
      setMetaContribuida(metaContribuidaData?.titulo || '');
      // Requisitar o valor total da meta contribuída
      const valorTotalMeta = metasUsuario.find((m) => m.id === meta)?.valorAlvo || 0;
      setValorAlvoMeta(valorTotalMeta)

      // Mostar mensagem de contribuição registrada por 3 segundos
      setMostrarMensagemContribuicao(true);
      setTimeout(() => setMostrarMensagemContribuicao(false), 3000);
    } catch (error) {
      console.error('Erro ao registrar contribuição:', error);
    }
    reset();
  }

  // Função para atualizar o saldo da meta ao mudar a seleção
  const selectMetaValor = (event) => {
    const idMeta = event.target.value;

    // Atualiza o valor alvo da meta selecionada
    const metaSelecionada = metasUsuario.find((meta) => meta.id === idMeta);
    setValorAlvoMeta(metaSelecionada?.valorAlvo || 0);

    fetch(`http://localhost:3000/contribuicoes?metaId=${idMeta}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar contribuições da meta");
        }
        return response.json();
      })
      .then((contribuicoes) => {
        const totalContribuicoes =
          contribuicoes.reduce((total, contrib) =>
            total + contrib.valor, 0);
        setSaldoMeta(totalContribuicoes);
      })
      .catch((error) => console.error("Erro ao calcular saldo da meta:", error));
  };

  // RENDERIZAÇÃO DO COMPONENTE -------------------------------------------------
  return (
    <div>
      < Header />

      <div className="flex justify-center text-center">
        <Titulo texto="Sua contribuição é a chave do LetsGoals!" />
      </div>

      <form onSubmit={handleSubmit(registrarContribuicao)}>
        <div className="form__select__meta  m-4 flex flex-col items-center">
          <div>

            <label
              htmlFor="meta"
              className="text-sm/8 font-medium text-gray-900">
              Em qual Meta você deseja contribuir?
            </label>

            <div className="grid grid-cols-1 m-0">

              <select
                id="meta"
                name="meta"
                autoComplete="meta"
                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-2 pr-4 pl-4 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-verdescuro"
                {...register("meta", {
                  required: "Você precisa selecionar uma meta",
                  validate: {
                    metaValida: (v) => v !== "Selecione uma meta" || "Selecione uma meta válida",
                  },
                })}
                onChange={selectMetaValor}
              >
                <option value="Selecione uma meta">Selecione uma meta</option>
                {metasUsuario.map((meta) => (
                  <option key={meta.id} value={meta.id}>
                    {meta.titulo}
                  </option>
                ))}
              </select>
              <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
              </svg>

            </div>
          </div>

          {errors.meta && (
            <p className="text-red-500 text-sm mt-1">{errors.meta.message}</p>
          )}

        </div>

        <div className="form__input__valor  m-4 flex flex-col items-center">

          <label
            htmlFor="valor"
            className="text-sm/8 font-medium text-gray-900">
            Qual valor que você pretende obter no total?
          </label>

          {
            document.getElementById("meta")?.value === "Selecione uma meta"
              ? <div><p className='text-fundo mb-2'>.</p></div>
              : <div className='informações__da__meta  flex gap-2 mb-2'>
                <p className="text-sm text-gray-700 mt-2">
                  Saldo atual <FormatarReais valor={saldoMeta} />
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Valor Alvo: <FormatarReais
                    valor={metasUsuario.find(meta => meta.id === document.getElementById("meta")?.value)?.valorAlvo || 0} />
                </p>
              </div>

          }

          <input
            id="valor"
            type="number"
            step="0.01"
            name="valor"
            min={0}
            className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro"
            {...register("valor", {
              required: "Você precisa informar o valor da contribuição",
              validate: {
                maiorQueZero: (v) => v > 0 || "Verifique o valor informado",
                menorQueValorAlvo: (v) =>
                  v <= (valorAlvoMeta - saldoMeta) || `O valor não pode ser maior que R$ ${(valorAlvoMeta - saldoMeta).toFixed(2)}`,
              },
            })}
          />

          {errors.valor && (
            <p className="text-red-500 text-sm mt-1">{errors.valor.message}</p>
          )}
        </div>

        <div className="form__botoes  flex p-4 justify-center gap-4 mt-12">
          <input
            className=" bg-branco text-textop py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:text-textos hover:outline-1"
            type="reset"
            value="Limpar" />

          <input
            className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-verdeescuro"
            type="submit"
            value="Contribuir" />
        </div>

      </form>

      {MostrarMensagemContribuicao && (
        <div className='text-center'>
          <Subtitulo className="text-center" texto={`Bem demais! Você contribuiu na Meta ${metaContribuida}`} />
        </div>
      )}

      <Footer />
    </div >
  )
}
