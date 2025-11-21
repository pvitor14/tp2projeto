import React from "react";
import { Link } from "react-router-dom";

const PaginaInicial = ({ psicologos, loading }) => {
  if (loading) {
    return <h2>Carregando psicólogos...</h2>;
  }

  return (
    <>
      <h2>Psicólogos disponíveis</h2>
      {psicologos.length === 0 && <p>Nenhum psicólogo encontrado.</p>}
      <ul className="lista-psicologos">
        {psicologos.map((psic) => (
          <li
            key={psic.id}
            className="item-psicologo"
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "15px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {/* NOVO: Exibição da Foto */}
            <img
              src={psic.foto || "https://via.placeholder.com/80"}
              alt={`Foto de ${psic.nomeCompleto}`}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div style={{ flexGrow: 1 }}>
              <strong>{psic.nomeCompleto}</strong>
              <p style={{ fontSize: "0.9em", color: "#555" }}>
                {/* NOVO: Exibição das Especialidades */}
                Especialidades:{" "}
                {(psic.especialidades || []).slice(0, 3).join(", ")}
                {psic.especialidades.length > 3 ? "..." : ""}
              </p>
            </div>

            <div>
              <Link to={`/perfil/${psic.id}`}>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Ver Perfil
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PaginaInicial;
