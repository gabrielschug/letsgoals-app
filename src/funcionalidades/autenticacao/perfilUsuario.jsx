import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { FaPencil } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";

import { useAuth } from "../../context/usuarioContext";



export default function PerfilUsuario() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset } = useForm()
    const { login } = useAuth()

    async function alterarDados(data) {
        const nome = data.nome
        const idade = data.idade
        const imagem = data.imagem
        console.log("Dados para alterar:", nome, idade, imagem)
        try {
            const resposta = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...usuario,
                    nomeUsuario: nome, idadeUsuario: idade, imagemUsuario: imagem
                })
            })
            if (!resposta.ok)
                throw new Error(`Erro ao alterar usuário`)
            const usuarioAtualizado = await resposta.json()
            console.log('Atualizado', usuarioAtualizado)
        } catch (erro) {
            console.log(`❌ Erro: ${erro.message}`)
        }
        console.log("Resetando o formulário")
        reset()
        login()
    }

    useEffect(() => {
        if (id) {
            // Busca os dados do usuário com base no ID da URL
            fetch(`http://localhost:3000/usuarios/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar dados do usuário");
                    }
                    return response.json();
                })
                .then((data) => setUsuario(data))
                .catch((err) => setError(err.message));
        }
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!usuario) {
        return <p>Carregando dados do usuário...</p>;
    }

    return (
        <div>
            <Header />
            <div className="p-4 flex flex-col items-center ">
                <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
                <img src={usuario.imagemUsuario} alt="" className="w-40 h-40 rounded-full  mb-4" />

                <form onSubmit={handleSubmit(alterarDados)}>
                    <div >
                        <div className="flex flex-col gap-2">
                            <p><strong>Nome:</strong> {usuario.nomeUsuario}</p>
                            <input type="text" className="bg-white outline-2 pl-2 w-40 outline-gray-400 rounded-sm"
                                {...register("nome",
                                    { required: "Informe o novo nome de usuário" })} />
                        </div>

                        <div className="mt-2">
                            <p><strong>Email:</strong> {usuario.emailUsuario}</p>
                        </div>

                        <div className="flex-col mb-2">
                            <div className="flex gap-2 items-center">
                                <strong>Idade:</strong> {usuario.idadeUsuario}
                            </div>
                            <div className="flex items-center gap-2 ">
                                <input type="text" className="bg-white outline-2 pl-2 w-20 outline-gray-400 rounded-sm"
                                    {...register("idade",
                                        { required: "Informe sua idade" })} />
                            </div>
                        </div>

                        <div className="flex-col  mb-2">
                            <div className="flex items-center gap-2">
                                <p><strong>Imagem</strong> {usuario.img}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="text" className="bg-white outline-2 pl-2 outline-gray-400 rounded-sm"
                                    {...register("imagem",
                                        { required: "Adicione sua imagem" })}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex gap-2 mt-8 justify-center m-0">
                        <input type="button"
                            className="bg-white text-textop py-1 px-3 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-gray-300"
                            value="Editar Dados" />
                        <input
                            className="bg-verde text-white py-1 px-3 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-verdeescuro"
                            type="submit"
                            value="Enviar" />
                    </div>
                </form>
            </div >
            <Footer />
        </div >
    );
}