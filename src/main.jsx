import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'


// Importando as Rotas de cada funcionalidade
import App from './App.jsx'
import CriarCaixinha from './CriarCaixinha.jsx'

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/criarcaixinha", Component: CriarCaixinha },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
