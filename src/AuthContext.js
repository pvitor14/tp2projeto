import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Busca o usuário salvo no localStorage ao abrir o app
  const [user, setUser] = useState(() => {
    const userSalvo = localStorage.getItem("usuario_logado");
    return userSalvo ? JSON.parse(userSalvo) : null;
  });

  const navigate = useNavigate();

  const login = (dadosUsuario) => {
    setUser(dadosUsuario);
    localStorage.setItem("usuario_logado", JSON.stringify(dadosUsuario));
    navigate("/chat"); // Redireciona direto para o chat após logar
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario_logado");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
