import React from "react";
import { Link } from "react-router-dom";
import "./PaginaInicial.css";

const PaginaInicial = ({ psicologos, loading }) => {
  if (loading) {
    return (
      <div className="container-inicial">
        <h2>Carregando psicólogos...</h2>
      </div>
    );
  }

  return (
    <div className="container-inicial">
      <h2>Encontre seu Especialista</h2>

      {psicologos.length === 0 && (
        <p>Nenhum psicólogo encontrado no momento.</p>
      )}

      <ul className="lista-psicologos">
        {psicologos.map((psic) => (
          <li key={psic.id} className="card-psicologo">
            <img
              src={psic.foto || "https://via.placeholder.com/150"}
              alt={`Foto de ${psic.nomeCompleto}`}
              className="foto-perfil"
            />

            <div className="info-psicologo">
              <strong>{psic.nomeCompleto}</strong>
              <div className="texto-especialidades">
                {(psic.especialidades || []).slice(0, 3).join(", ")}
                {psic.especialidades && psic.especialidades.length > 3
                  ? "..."
                  : ""}
              </div>
            </div>

            <Link
              to={`/perfil/${psic.id}`}
              style={{ width: "100%", textAlign: "center" }}
            >
              <button className="btn-ver-perfil">Ver Perfil</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginaInicial;
