import { Link } from "react-router";
export default function TituloCabecalho({ texto, link }) {

  return (
    <>
      <Link to={link}>
        <h1 className="text-2xl font-medium text-branco">{texto}</h1>
      </Link>
    </>
  )
}