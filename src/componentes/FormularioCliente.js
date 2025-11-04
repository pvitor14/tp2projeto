import React, { useState } from "react";

const FormularioCliente = ({ psicologo, aoAgendarConsulta }) => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [horarioConsulta, setHorarioConsulta] = useState("");

  const aoSubmeter = (e) => {
    e.preventDefault();
    if (horarioConsulta) {
      aoAgendarConsulta(nomeCliente, horarioConsulta);
    }
  };

  return (
    <div>
      <h2>Agendamento de Consulta</h2>
      <p>Psicólogo: {psicologo?.nomeCompleto}</p>
      <p>Local: {psicologo?.endereco}</p>
      <p>Horários disponíveis: {(psicologo?.horarios || []).join(", ")}</p>{" "}
      <form onSubmit={aoSubmeter}>
        <input
          type="text"
          placeholder="Seu nome"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Horário de consulta"
          value={horarioConsulta}
          onChange={(e) => setHorarioConsulta(e.target.value)}
          required
        />
        <button type="submit">Marcar Consulta</button>
      </form>
    </div>
  );
};

export default FormularioCliente;
