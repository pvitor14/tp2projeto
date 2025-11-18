import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AgendamentoConsulta from "../componentes/AgendamentoConsulta";

const Agendamento = ({ psicologos, consultas, aoAgendarConsulta }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const psicologoSelecionado = psicologos.find(
    (p) => p.id.toString() === id
  );

  // Agendamento e depois voltar ao perfil
  const handleAgendar = (nomeCliente, horarioConsulta) => {
    aoAgendarConsulta(psicologoSelecionado.id, nomeCliente, horarioConsulta);
    alert("Consulta agendada!");
    navigate(`/perfil/${id}`); // Volta para o perfil
  };

  if (!psicologoSelecionado) {
    return <h2>Psicólogo não encontrado.</h2>;
  }

  return (
    <>
      <button
        className="botao-voltar"
        onClick={() => navigate(`/perfil/${id}`)} // Voltar para o Perfil
      >
        ← Voltar para Perfil
      </button>

      <AgendamentoConsulta
        psicologo={psicologoSelecionado}
        aoAgendarConsulta={handleAgendar}
      />

      <div className="consultas-agendadas">
        <h3>Consultas Agendadas:</h3>
        <ul>
          {(consultas[id] || []).map((consulta, i) => (
            <li key={i}>
              {consulta.nomeCliente} - {consulta.horarioConsulta}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Agendamento;