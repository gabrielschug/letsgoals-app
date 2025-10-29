import { Link } from "react-router";
export default function IconeCabecalho({ imagem, link }) {

  return (
    <>
      <Link to={link}>
        <div className=" bg-verdeescuro p-3 rounded-full flex items-center justify-center"><img className="w-5" src={imagem} alt={`Imagem ${imagem}`} /></div>
      </Link>
    </>
  )
}