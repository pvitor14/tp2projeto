// src/paginas/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = ({ psicologos, removerPsicologo, loading }) => {
  if (loading) {
    return <h2>Carregando psicólogos...</h2>;
  }

  return (
    <React.Fragment>
      <h2 style={{ marginTop: "2rem" }}>Psicólogos disponíveis</h2>

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
                Especialidades:{" "}
                {(psic.especialidades || []).slice(0, 3).join(", ")}
                {psic.especialidades && psic.especialidades.length > 3
                  ? "..."
                  : ""}
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

              {removerPsicologo && (
                <button
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => removerPsicologo(psic.id)}
                >
                  Remover
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Home;
