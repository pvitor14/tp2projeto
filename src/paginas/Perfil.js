import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PerfilPsicologo from "../componentes/PerfilPsicologo";

const Perfil = ({ psicologos }) => {
  const { id } = useParams(); // Pega o 'id'
  const navigate = useNavigate(); // Para o botão "voltar"

  // Encontra o psicólogo na lista
  const psicologoSelecionado = psicologos.find(
    (p) => p.id.toString() === id
  );

  if (!psicologoSelecionado) {
    return (
      <>
        <h2>Psicólogo não encontrado.</h2>
        <button className="botao-voltar" onClick={() => navigate("/")}>
          Voltar à lista
        </button>
      </>
     );
  }

  return (
    <>
      <PerfilPsicologo
        psicologo={psicologoSelecionado}
        // Função de agendar
        aoClicarAgendar={() => navigate(`/agendar/${id}`)}
      />
      <button className="botao-voltar" onClick={() => navigate("/")}>
        Voltar à lista de psicólogos
      </button>
    </>
  );
};

export default Perfil;