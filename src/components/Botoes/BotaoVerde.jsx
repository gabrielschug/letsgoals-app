import { Link } from "react-router";
export default function BotaoVerde({ texto, link, type }) {

  return (
    <>
      <Link to={link}>
        <input
          className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:bg-verdeescuro"
          type={type} value={texto} />
      </Link>
    </>
  )
}