import { Link } from "react-router";

export default function Cadastro() {

  return (
    <div className="bg-white">

      <h1>Cadastro</h1>

      <div className="m-4">
        <p>
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Qual seu nome?</label>
          <input id="titulo" type="text" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>

        <p>
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Digite um usuário</label>
          <input id="titulo" type="text" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>

        <p>
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Crie uma senha:</label>
          <input id="titulo" type="password" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>

        <p>
          <input
            className=" text-slate-700 hover:text-slate-800 px-8 text-md rounded-full flex items-center font-bold cursor-pointer"
            type="reset" value="Limpar" />

          <Link to="/login">
            <input
              className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center font-bold cursor-pointer hover:bg-verdeescuro"
              type="submit" value="Criar" />
          </Link>
        </p>


      </div>

    </div>
  )
}