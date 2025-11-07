import { Link } from "react-router";
import IconeCabecalho from "../Layout/IconeCabecalho";
import TituloCabecalho from "../Layout/TituloCabecalho";

export default function Header() {


  return (
    <div className="sticky top-0 w-full bg-verde py-4 px-2 flex justify-around items-center">
      <img className="rounded-4xl w-12 border-branco border-3" src="img_usuario.png" alt="" />
      <TituloCabecalho texto="LetsGoals" link="/home" />
      <div className="flex gap-2">
        <IconeCabecalho imagem='icone_ajuda.png' />
        <IconeCabecalho imagem='icone_sair.png' />
      </div>
    </div>
  )
} 