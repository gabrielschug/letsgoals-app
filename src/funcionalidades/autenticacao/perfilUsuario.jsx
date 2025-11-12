import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function PerfilUsuario() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            // Busca os dados do usuário com base no ID da URL
            fetch(`http://localhost:3000/usuarios/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar dados do usuário");}
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
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
                <p><strong>Nome:</strong> {usuario.nomeUsuario}</p>
                <p><strong>Email:</strong> {usuario.emailUsuario}</p>
                <p><strong>Idade:</strong> {usuario.idadeUsuario}</p>
            </div>
            <Footer />
        </div>
    );
}