import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

// Importando Provedor de Autenticação
import AuthProvider from './context/usuarioContext.jsx'

// Importando as Rotas de cada funcionalidade
import CriarMetaForm from './funcionalidades/metas/CriarMetaForm.jsx'
import Inicio from './funcionalidades/boasVindas/Inicio.jsx'
import Login from './funcionalidades/autenticacao/LoginForm.jsx'
import Cadastro from './funcionalidades/autenticacao/CadastroForm.jsx'
import Home from './funcionalidades/metas/home/Home.jsx'
import Ajuda from './funcionalidades/boasVindas/Ajuda.jsx'
import { MetaDetalhes } from './funcionalidades/metas/MetaDetalhes.jsx'
import PerfilUsuario from './funcionalidades/autenticacao/perfilUsuario.jsx'
import Contribuir from './funcionalidades/metas/contribuir/contribuir.jsx'

const router = createBrowserRouter([
  { path: "/", Component: Inicio },
  { path: "/ajuda", Component: Ajuda },
  { path: "/login", Component: Login },
  { path: "/cadastro", Component: Cadastro },
  { path: "/home", Component: Home },
  { path: "/criarmeta", Component: CriarMetaForm },
  { path: "/meta-detalhes/:id", Component: MetaDetalhes },
  { path: "/usuarios/:id", Component: PerfilUsuario },
  { path: "/contribuir", Component: Contribuir },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)