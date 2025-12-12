import React from "react";
import { Link } from "react-router-dom";
import "./Navegacao.css";

const Navegacao = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="link-azul">
            Lista de Psicólogos
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/minhas-consultas" className="link-verde">
            Minhas Consultas
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/cadastro-psicologo" className="link-laranja">
            Sou Psicólogo
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/cadastro-usuario" className="link-vermelho">
            Sou Paciente
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/chat" className="link-roxo">
            Bate-papo
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navegacao;
