import { Link, useNavigate } from "react-router";
import IconeCabecalho from "../Layout/IconeCabecalho";
import TituloCabecalho from "../Layout/TituloCabecalho";
import { useAuth } from "../../context/usuarioContext"; // Importa o hook useAuth

export default function Header() {
  const { logout, usuarioLogado } = useAuth(); // Obtém a função logout e o usuário logado do contexto
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleLogout = () => {
    logout();
    navigate("/"); // Redireciona para a rota '/'
  };

  const handlePerfilUsuario = () => {
    if (usuarioLogado) {
      navigate(`/usuarios/${usuarioLogado.id}`); // Redireciona para a página de detalhes do usuário logado com o ID na URL
    } else {
      console.error("Usuário não está logado.");
    }
  };

  return (
    <div className="sticky top-0 w-full bg-verde py-4 px-2 flex justify-around items-center ">
      {usuarioLogado ? (
        <img
          className="rounded-4xl h-12 w-12 border-branco border-2 cursor-pointer image-cover"
          src={usuarioLogado.imagemUsuario}
          alt="Foto do usuário"
          onClick={handlePerfilUsuario}
        />
      ) : (
        <div className="rounded-4xl h-12 w-12 border-branco border-2 bg-gray-300"></div>
      )}
      <TituloCabecalho texto="LetsGoals" link={"/home"} />
      <div className="flex gap-2">
        <Link to="/ajuda">
          <IconeCabecalho imagem="/icone_ajuda.png" />
        </Link>
        <IconeCabecalho imagem="/icone_sair.png" aoClicar={handleLogout} /> {/* Chama handleLogout ao clicar */}
      </div>
    </div>
  );
}