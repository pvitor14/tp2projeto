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
          <li key={psic.id} className="item-psicologo">
            <strong>{psic.nomeCompleto}</strong>
            <div>
              <Link to={`/perfil/${psic.id}`}>
                <button>Ver Perfil</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PaginaInicial;
