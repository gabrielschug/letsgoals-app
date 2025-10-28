import { Link } from "react-router";

export default function Inicio() {

  return (
    <div className="bg-white h-screen flex-col text-center justify-center items-center">
      <h1>Bem-vindo ao Lets Goals!</h1>
      <img className="w-40" src="icone_caixa.png" />
      <Link to="/login">
        <div>Entrar</div>
      </Link>

      <p>Também quero poupar sua grana?</p>
      <Link to="/cadastro">
        <div>Crie sua Conta aqui!</div>
      </Link>
    </div>
  )
}