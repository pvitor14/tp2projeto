import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PerfilPsicologo from "../componentes/PerfilPsicologo"; // Componente para exibir o perfil do psicólogo
import AgendamentoConsulta from "../componentes/AgendamentoConsulta"; // Componente para agendar uma consulta

const Perfil = ({ psicologos, consultas, aoAgendarConsulta }) => {
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false); // Controla se a tela de agendamento está visível ou não
  const { id } = useParams(); // Obtém o ID do psicólogo da URL
  const navigate = useNavigate(); // Usado para navegação entre páginas

  // Encontra o psicólogo selecionado usando o ID da URL
  const psicologoSelecionado = psicologos.find((p) => p.id.toString() === id);

  // Se o psicólogo não for encontrado, exibe uma mensagem de erro
  if (!psicologoSelecionado) {
    return (
      <React.Fragment>
        <h2>Psicólogo não encontrado.</h2>
        <button className="botao-voltar" onClick={() => navigate("/")}>
          Voltar à lista
        </button>
      </React.Fragment>
    );
  }

  // Função que será chamada para agendar uma consulta
  const aoAgendar = (nomeCliente, horarioConsulta) => {
    // Verifica se o horário está disponível
    if (!psicologoSelecionado.horarios.includes(horarioConsulta)) {
      alert("Horário indisponível.");
      return;
    }

    // Chama a função passada via props para agendar a consulta
    aoAgendarConsulta(psicologoSelecionado.id, nomeCliente, horarioConsulta);
  };

  // Consultas agendadas do psicólogo
  const consultasDoPsicologo = consultas[psicologoSelecionado.id] || [];

  return (
    <React.Fragment>
      {/* Se a tela de agendamento não estiver visível, exibe o perfil do psicólogo */}
      {!mostrarAgendamento ? (
        <>
          <PerfilPsicologo
            psicologo={psicologoSelecionado} // Passa os dados do psicólogo para o componente
            aoClicarAgendar={() => setMostrarAgendamento(true)} // Exibe a tela de agendamento quando clicado
          />
          <button className="botao-voltar" onClick={() => navigate("/")}>
            Voltar à lista de psicólogos
          </button>
        </>
      ) : (
        <>
          {/* Tela de agendamento */}
          <button
            className="botao-voltar"
            onClick={() => setMostrarAgendamento(false)}
          >
            ← Voltar para Perfil
          </button>

          {/* Componente de agendamento da consulta */}
          <AgendamentoConsulta
            psicologo={psicologoSelecionado} // Passa os dados do psicólogo
            aoAgendarConsulta={aoAgendar} // Função para agendar a consulta
          />

          <div className="consultas-agendadas">
            <h3>Consultas Agendadas:</h3>
            {consultasDoPsicologo.length > 0 ? (
              <ul>
                {consultasDoPsicologo.map((consulta, i) => (
                  <li key={i}>
                    {consulta.nomeCliente} - {consulta.horarioConsulta}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma consulta agendada ainda.</p>
            )}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Perfil;
