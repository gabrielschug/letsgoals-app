import { Link } from "react-router";

export default function Header() {

  return (
    <div className="sticky top-0 w-full bg-verde py-4 px-2 flex justify-around items-center">
      <img className="rounded-4xl w-12 border-branco border-3" src="img_usuario.png" alt="" />
      <Link to="/">
        <h1 className="text-2xl font-medium text-branco">LetsGoals!</h1>
      </Link>
      <div className="flex gap-2">

        <div className=" bg-verdeescuro p-3 rounded-full flex items-center justify-center"><img className="w-5" src="icone_ajuda.png" alt="" />
        </div>

        <Link to='/inicio'>
          <div className=" bg-verdeescuro p-3 rounded-full flex items-center justify-center"><img className="w-5" src="icone_sair.png" alt="" /></div>
        </Link>
      </div>
    </div>
  )
} 