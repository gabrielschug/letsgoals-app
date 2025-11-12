import { useAuth } from "../../context/usuarioContext"

export default function IconeCabecalho({ imagem, aoClicar }) {

  return (
    <>
      <button onClick={aoClicar} className="bg-verdeescuro p-3 rounded-full flex items-center justify-center cursor-pointer">
        <img className="w-5" src={imagem} alt={`Imagem ${imagem}`} />
      </button>
    </>
  )
}