import { Link } from "react-router";

export default function Header() {

  return (
    <div className="fixed w-full bg-verde py-4 px-2 flex justify-around items-center">
      <img className="rounded-4xl w-12 border-branco border-3" src="img_usuario.png" alt="" />
      <Link to="/">
        <h1 className="text-2xl font-medium text-branco">LetsGoals!</h1>
      </Link>
      <div className="flex gap-2">
        <div className="h-1 w-1 bg-verdeescuro p-5 rounded-full flex items-center justify-center"><a className="cursor-pointer text-branco font-medium text-md ">?</a></div>
        <div className="h-1 w-1 bg-verdeescuro p-5 rounded-full flex items-center justify-center"><a className="cursor-pointer text-branco font-medium text-md ">#</a></div>
      </div>
    </div>
  )
}