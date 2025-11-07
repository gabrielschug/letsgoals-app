import { Link } from "react-router";
export default function BotaoBranco({ texto, link, type }) {

  return (
    <>
      <Link to={link}>
        <input
          className="bg-branco text-textop py-3 px-9 text-md rounded-full flex items-center text-center font-bold cursor-pointer hover:text-textos hover:outline-1"
          type={type}
          value={texto} />
      </Link>
    </>
  )
}