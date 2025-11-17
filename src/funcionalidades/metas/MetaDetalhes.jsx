import { useParams } from "react-router";
import { useEffect, useState } from "react";

import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useAuth } from "../../context/usuarioContext";
import FormatarReais from "../../components/Layout/FormatarReais";
import { FaCalendarAlt } from "react-icons/fa";
import { PiMoneyWavyFill } from "react-icons/pi";




// INICIA A FUNÇÃO PRINCIPAL ---------------------------------------------------

export function MetaDetalhes() {

    // Cria as variáveis de estado e hooks
    const { id } = useParams();
    const { usuarioLogado } = useAuth();
    const [meta, setMeta] = useState(null);
    const [lider, setLider] = useState(null);
    const [participantes, setParticipantes] = useState([]);
    const [contribuicoes, setContribuicoes] = useState([]);
    const [error, setError] = useState(null);

    //
    useEffect(() => {
        // Busca os dados do Usuário atraves do ID da meta
        fetch(`http://localhost:3000/metas/${id}`)
            .then((response) => {
                if (!response.ok) { throw new Error("Erro ao buscar detalhes da meta"); }
                return response.json();
            })
            .then((data) => {
                setMeta(data); // Todas infos da Meta
                // Busca o líder da meta
                return fetch(`http://localhost:3000/usuarios/${data.liderId}`);
            })
            .then((response) => {
                if (!response.ok) { throw new Error("Erro ao buscar líder da meta"); }
                return response.json();
            })
            .then((data) => setLider(data)) // Todas infos do Usuário Lider
            .catch((err) => setError(err.message));

        // Busca os participantes da meta
        fetch(`http://localhost:3000/participacoes?metaId=${id}`)
            .then((response) => {
                if (!response.ok) { throw new Error("Erro ao buscar participantes da meta"); }
                return response.json();
            })
            .then((data) => {
                const userPromises = data.map((participacao) =>
                    fetch(`http://localhost:3000/usuarios/${participacao.usuarioId}`)
                        .then((response) => {
                            if (!response.ok) { throw new Error("Erro ao buscar usuário participante"); }
                            return response.json();
                        })
                );

                Promise.all(userPromises)
                    .then((users) => setParticipantes(users))
                    .catch((err) => setError(err.message));
            })
            .catch((err) => setError(err.message));

        // Busca as contribuições do usuário logado e dos participantes
        fetch(`http://localhost:3000/contribuicoes?metaId=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar contribuições da meta");
                }
                return response.json();
            })
            .then((data) => setContribuicoes(data))
            .catch((err) => setError(err.message));
    }, [id, usuarioLogado]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!meta || !lider) {
        return <p>Carregando detalhes da meta...</p>;
    }

    const contribuicaoUsuarioLogado = contribuicoes
        .filter((c) => c.usuarioId === usuarioLogado.id)
        .reduce((acc, curr) => acc + curr.valor, 0);

    return (
        <div className="bg-fundo h-screen flex flex-col">
            <Header />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{meta.titulo}</h1>
                <img
                    src={meta.imagem}
                    alt={meta.titulo}
                    className={meta.status == 'Concluída'
                        ? "w-32 h-32 object-cover rounded-md mb-4 border-4 border-verde"
                        : "w-32 h-32 object-cover rounded-md mb-4"
                    }
                />
                {meta.status == 'Concluída' && <p><strong>Status: {meta.status}</strong></p>}
                <p><strong>Valor Alvo:</strong> <FormatarReais valor={meta.valorAlvo} /></p>
                <p><strong>Contribuído:</strong> <FormatarReais valor={
                    contribuicoes.reduce((acc, curr) => acc + curr.valor, 0)
                } /></p>
                <p><strong>Período para Conclusão:</strong> {meta.periodoConclusao} meses</p>
                <p><strong>Líder:</strong>  {lider.nomeUsuario}</p>
                <p><strong>Senha Convite: </strong><span className="bg-azul px-1 font-semibold rounded-sm text-white"> {meta.id} </span></p>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Participantes</h3>
                    <ul className="list-disc pl-5">
                        {participantes.map((p) => (
                            <li key={p.id}>{p.nomeUsuario}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Contribuições</h3>
                    <p><strong>Sua contribuição:</strong> <FormatarReais valor={contribuicaoUsuarioLogado} /></p>
                    <ul className="list-disc pl-5">
                        {participantes.map((p) => {
                            const contribuicoesUsuario = contribuicoes.filter((c) => c.usuarioId === p.id);
                            return (
                                <li key={p.id}>
                                    <p>{p.nomeUsuario}:</p>
                                    <ul className="list-disc pl-5">
                                        {contribuicoesUsuario.map((contribuicao) => (
                                            <li key={contribuicao.id} className="flex items-center gap-1">
                                                <FaCalendarAlt />
                                                {new Date(contribuicao.data).toLocaleDateString()} | <PiMoneyWavyFill />
                                                <FormatarReais valor={contribuicao.valor} />
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Footer />


            <form action=""></form>
        </div>
    );
}