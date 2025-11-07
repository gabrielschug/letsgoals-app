import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Criar o Contexto (o "quadro de avisos" em si)
const AuthContext = createContext();

// 2. Criar o "Provedor" (o componente que gerencia o quadro de avisos)
// (Usamos 'export default' para que seja a exportação principal do arquivo)
export default function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Contexto checando o localStorage pra ler o usuário
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Efeito para carregar o usuário do localStorage ao iniciar
  useEffect(() => {
    try {
      const usuarioNoStorage = localStorage.getItem("letsgoals:usuario");
      if (usuarioNoStorage) {
        setUsuarioLogado(JSON.parse(usuarioNoStorage));
      }
    } catch (error) {
      console.error("Falha ao ler o localStorage", error)
    }
    setIsAuthLoading(false)
  }, []);

  // Função para fazer login
  const login = (usuario) => {
    try {
      localStorage.setItem("letsgoals:usuario", JSON.stringify(usuario));
      setUsuarioLogado(usuario);
    } catch (error) {
      console.error("Falha ao salvar no localStorage", error);
    }
  }

  // Função para fazer logout
  const logout = () => {
    try {
      localStorage.removeItem("letsgoals:usuario");
      setUsuarioLogado(null);
    } catch (error) {
      console.error("Falha ao remover do localStorage", error);
    }
  };

  // 3. O valor que será compartilhado com todos os componentes "filho"
  const value = {
    usuarioLogado,
    login,
    logout,
    isAuthLoading, // <-- Exportamos a nova flag
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. Criar um "Hook" customizado para facilitar o uso
// (exportação nomeada, pois é uma função auxiliar)
export const useAuth = () => {
  return useContext(AuthContext);
}