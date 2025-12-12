import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./PaginaLogin.css";

const PaginaLogin = () => {
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Preencha o e-mail!");

    // Simulação de login (aceita qualquer e-mail por enquanto)
    // Aqui pegaríamos o nome real se tivesse uma API REST por exemplo
    const usuarioSimulado = {
      nome: email.split("@")[0], // Usa a parte antes do @ como nome
      email: email,
    };

    login(usuarioSimulado);
  };

  return (
    <div className="login-container">
      <h2>Acesso ao Chat</h2>
      <p>Entre para conversar com psicólogos e pacientes.</p>

      <form onSubmit={handleSubmit} className="form-login">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="password" placeholder="Digite sua senha" required />
        <button type="submit" className="btn-entrar">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default PaginaLogin;
