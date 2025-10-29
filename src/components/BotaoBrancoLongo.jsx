import { Link } from "react-router";

export default function BotaoBrancoLongo({ texto, link }) {

  return (
    <>
      <Link to={link}>
        <div className="bg-branco py-2 px-17 text-sm rounded-full flex items-center font-bold text-slate-900 cursor-pointer hover:bg-slate-100 transition-transform duration-200 ease-in-out hover:scale-103">{texto}
        </div>
      </Link>
    </>
  )
}