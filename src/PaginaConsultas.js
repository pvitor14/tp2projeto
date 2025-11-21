import React from "react";
import { Link } from "react-router-dom";

const PaginaConsultas = ({ consultas, psicologos }) => {
  const listaDeConsultas = Object.keys(consultas).flatMap((idPsicologo) => {
    const psicologo = psicologos.find((p) => p.id === idPsicologo);
    const nomePsicologo = psicologo
      ? psicologo.nomeCompleto
      : "Psicólogo Desconhecido";

    return consultas[idPsicologo].map((consulta, index) => ({
      ...consulta,
      nomePsicologo,
      idPsicologo,
      key: `${idPsicologo}-${index}`,
    }));
  });

  // Organiza as consultas por nome do psicólogo
  listaDeConsultas.sort((a, b) =>
    a.nomePsicologo.localeCompare(b.nomePsicologo)
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>📅 Minhas Consultas Agendadas</h2>

      {listaDeConsultas.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "20px",
            border: "1px dashed #ccc",
          }}
        >
          <p>Você ainda não tem consultas agendadas.</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginTop: "15px",
                cursor: "pointer",
              }}
            >
              Agendar Sua Primeira Consulta
            </button>
          </Link>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {listaDeConsultas.map((consulta) => (
            <li
              key={consulta.key}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                Psicólogo(a): {consulta.nomePsicologo}
              </p>
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "0.9em",
                  color: "#555",
                }}
              >
                Cliente: {consulta.nomeCliente}
              </p>
              <p style={{ margin: 0, color: "#007bff", fontWeight: "bold" }}>
                Horário: {consulta.horarioConsulta}
              </p>
              <Link
                to={`/perfil/${consulta.idPsicologo}`}
                style={{
                  fontSize: "0.8em",
                  color: "#007bff",
                  textDecoration: "none",
                }}
              >
                Ver Perfil do Psicólogo
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaginaConsultas;
