import { Link } from "react-router"
import Subtitulo from "./Subtitulo"

export default function BtnFuncionalidade() {

  const funcionalidades = [
    {
      titulo: "Contribuir",
      icone: "icone_contribuir.png",
      rota: "/criarcaixinha"
    },
    {
      titulo: 'Entrar em uma Caixinha',
      icone: "icone_entrar.png",
      rota: "/criarcaixinha"
    },
    {
      titulo: 'Criar uma Caixinha',
      icone: "icone_criar.png",
      rota: "/criarcaixinha"
    },
    {
      titulo: 'Ajuda',
      icone: "icone_ajuda.png",
      rota: "/criarcaixinha"
    }
  ]

  return (
    <div className="p-4 bg-gray-200">
      <Subtitulo texto='Bora realizar seus sonhos?' />
      <div className="flex overflow-x-auto items-start mt-4 gap-3 text-center cursor-pointer ">
        {funcionalidades.map((funcionalidade, index) => (
          <div
            key={index}
            className=" card__container  flex flex-col items-center">
            <Link to={funcionalidade.rota}>
              <div className="card__imagem  w-[100px] h-[100px] bg-verde rounded-2xl flex items-center justify-center hover:bg-verdeescuro not-visited:transition-transform duration-200">
                <img src={funcionalidade.icone} alt={funcionalidade.titulo} className="w-10 h-10 object-contain" />
              </div>
            </Link>
            <p className="card__titulo  mt-2 text-md font-medium text-gray-900">{funcionalidade.titulo}</p>
          </div>
        ))
        }
      </div>
    </div>
  )
}