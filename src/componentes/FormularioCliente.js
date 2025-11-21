import React, { useState } from "react";

const FormularioCliente = ({ psicologo, aoAgendarConsulta }) => {
  const [nomeCliente, setNomeCliente] = useState("");
  const [horarioConsulta, setHorarioConsulta] = useState("");

  const horariosDisponiveis = psicologo?.horarios || [];

  const aoSubmeter = (e) => {
    e.preventDefault();

    if (nomeCliente && horarioConsulta) {
      aoAgendarConsulta(nomeCliente, horarioConsulta);
    } else {
      alert("Por favor, preencha seu nome e selecione um horário.");
    }
  };

  return (
    <div>
      <h2>Agendamento de Consulta</h2>
      <p>Psicólogo: {psicologo?.nomeCompleto}</p>
      <p>Local: {psicologo?.endereco}</p>

      <form onSubmit={aoSubmeter}>
        <input
          type="text"
          placeholder="Seu nome"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />

        <select
          value={horarioConsulta}
          onChange={(e) => setHorarioConsulta(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecione um Horário
          </option>
          {horariosDisponiveis.map((horario, index) => (
            <option key={index} value={horario}>
              {horario}
            </option>
          ))}
        </select>

        <button type="submit">Marcar Consulta</button>
      </form>
    </div>
  );
};

export default FormularioCliente;
