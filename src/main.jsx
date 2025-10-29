import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'


// Importando as Rotas de cada funcionalidade
import App from './App.jsx'
import CriarCaixinha from '../src/pages/CriarCaixinha.jsx'
import Inicio from '../src/pages/Inicio.jsx'
import Login from '../src/pages/Login.jsx'
import Cadastro from '../src/pages/Cadastro.jsx'

const router = createBrowserRouter([
  { path: "/", Component: Inicio },
  { path: "/login", Component: Login },
  { path: "/cadastro", Component: Cadastro },
  { path: "/menu", Component: App },
  { path: "/criarcaixinha", Component: CriarCaixinha },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
