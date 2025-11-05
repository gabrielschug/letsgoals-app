import { Link } from "react-router";
export default function BotaoVoltar({ texto, link }) {

  return (
    <>
      <Link to={link}
        className="text-textos  py-3 px-9 text-md flex items-center text-center cursor-pointer hover:text-textop  hover:underline">
        {texto}
      </Link>
    </>
  )
}