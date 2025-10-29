import "../input.css"

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router";


export default function CriarCaixinha() {

  // HOOK FORM

  // ROUTER API CREATE DATA


  return (
    <div className="container  bg-white ">
      <Header />
      <h1>Bora Criar uma Caixinha Coletiva!</h1>
      <form>

        <p className="m-4">
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Informe qual é a sua Meta:</label>
          <input id="titulo" type="text" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>
        <p className="m-4">
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Quanto você planeja juntar no total:</label>
          <input id="titulo" type="decimal" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>
        <p className="m-4">
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Quanto vai guardar agora? Seu atual é de [SALDO]</label>
          <input id="titulo" type="decimal" name="titulo" className="block rounded-md bg-white px-4 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-verdeescuro" />
        </p>
        <p className="m-4">
          <label for="titulo" className="text-sm/8 font-medium text-gray-900">Em quantos meses você deseja alcançar sua Meta?</label>

          <div>
            <div className="mt-2 grid grid-cols-1">
              <select id="country" name="country" autocomplete="country-name" className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-2 pr-8 pl-4 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-verdescuro">
                <option>3 meses</option>
                <option>6 meses</option>
                <option>9 meses</option>
                <option>1 ano</option>
                <option>2 anos</option>
              </select>
              <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
              </svg>
            </div>
          </div>
        </p>

        <p className="flex justify-center gap-4 p-4">
          <input
            className=" text-slate-700 hover:text-slate-800 px-8 text-md rounded-full flex items-center font-bold cursor-pointer"
            type="reset" value="Limpar" />

          <Link to="/">
            <input
              className="bg-verde text-white py-3 px-9 text-md rounded-full flex items-center font-bold cursor-pointer hover:bg-verdeescuro"
              type="submit" value="Criar" />
          </Link>
        </p>

      </form>
      <Footer />
    </div>
  )
}
