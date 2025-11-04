import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PerfilPsicologo from "./componentes/PerfilPsicologo";
import AgendamentoConsulta from "./componentes/AgendamentoConsulta";

const PaginaPerfil = ({ psicologos, consultas, aoAgendarConsulta }) => {
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);
  const { id } = useParams();

  const psicologoSelecionado = psicologos.find((p) => p.id === id);

  const aoAgendar = (nomeCliente, horarioConsulta) => {
    if (!psicologoSelecionado.horarios.includes(horarioConsulta)) {
      alert("Horário indisponível.");
      return;
    }
    aoAgendarConsulta(psicologoSelecionado.id, nomeCliente, horarioConsulta);
  };

  if (!psicologoSelecionado) {
    return (
      <div>
        <h2>Psicólogo não encontrado.</h2>
        <Link to="/">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <>
      {!mostrarAgendamento ? (
        // ============= TELA DE PERFIL =============
        <>
          <PerfilPsicologo
            psicologo={psicologoSelecionado}
            aoClicarAgendar={() => setMostrarAgendamento(true)}
          />
          <Link to="/">
            <button className="botao-voltar">Voltar à lista</button>
          </Link>
        </>
      ) : (
        // ============= TELA DE AGENDAMENTO =============
        <>
          <button
            className="botao-voltar"
            onClick={() => setMostrarAgendamento(false)}
          >
            ← Voltar para Perfil
          </button>

          <AgendamentoConsulta
            psicologo={psicologoSelecionado}
            aoAgendarConsulta={aoAgendar}
          />

          <div className="consultas-agendadas">
            <h3>Consultas Agendadas:</h3>
            <ul>
              {(consultas[psicologoSelecionado.id] || []).map((consulta, i) => (
                <li key={i}>
                  {consulta.nomeCliente} - {consulta.horarioConsulta}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default PaginaPerfil;
