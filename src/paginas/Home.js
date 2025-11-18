import React from "react";
import { Link } from "react-router-dom";
import FormularioPsicologo from "../componentes/FormularioPsicologo";

// Recebemos os dados e as funções do App.js via props
const Home = ({ psicologos, aoCadastrarPsicologo, removerPsicologo }) => {
  return (
    <>
      <FormularioPsicologo aoCadastrarPsicologo={aoCadastrarPsicologo} />

      <h2 style={{ marginTop: "2rem" }}>Psicólogos cadastrados</h2>
      {psicologos.length === 0 && <p>Nenhum psicólogo cadastrado.</p>}
      <ul className="lista-psicologos">
        {psicologos.map((psic) => (
          <li key={psic.id} className="item-psicologo">
            <strong>{psic.nomeCompleto}</strong>
            <div>
              {/* Usamos Link para navegar para a URL do perfil */}
              <Link to={`/perfil/${psic.id}`}>
                <button>Ver Perfil</button>
              </Link>
              <button onClick={() => removerPsicologo(psic.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
        </ul>
    </>
  );
};

export default Home;