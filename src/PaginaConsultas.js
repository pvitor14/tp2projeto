import React from "react";
import { Link } from "react-router-dom";
import "./PaginaConsultas.css";

const PaginaConsultas = ({ consultas, psicologos }) => {
  const todasConsultas = Object.entries(consultas).flatMap(
    ([idPsicologo, lista]) => {
      const psicologo = psicologos.find((p) => p.id === idPsicologo);
      return lista.map((c) => ({
        ...c,
        nomePsicologo: psicologo?.nomeCompleto || "Psicólogo",
      }));
    }
  );

  return (
    <div className="container-consultas">
      <h2>Minhas Consultas</h2>

      {todasConsultas.length === 0 ? (
        <div className="consulta-vazia">
          <p>Você ainda não tem consultas agendadas.</p>
          <Link to="/">
            <button className="botao-voltar">Agendar Nova Consulta</button>
          </Link>
        </div>
      ) : (
        <ul className="lista-consultas">
          {todasConsultas.map((consulta, index) => (
            <li key={index} className="item-consulta">
              <strong>{consulta.nomePsicologo}</strong>
              <span>{consulta.horarioConsulta}</span>
              <small>Paciente: {consulta.nomeCliente}</small>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/">Voltar para a Home</Link>
      </div>
    </div>
  );
};

export default PaginaConsultas;
