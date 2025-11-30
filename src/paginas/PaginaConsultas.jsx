// src/paginas/PaginaConsultas.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const PaginaConsultas = ({ consultas, psicologos }) => {
  const navigate = useNavigate();

  console.log("Consultas:", consultas);
  console.log("Psicólogos:", psicologos);

  const handleGoToPerfil = (idPsicologo) => {
    navigate(`/perfil/${idPsicologo}`);
  };

  return (
    <div>
      <h2>Minhas Consultas</h2>
      {psicologos.length === 0 ? (
        <p>Não há psicólogos disponíveis.</p>
      ) : (
        <div>
          <h3>Consultas Agendadas:</h3>
          {Object.keys(consultas).length === 0 ? (
            <p>Você ainda não tem consultas agendadas.</p>
          ) : (
            psicologos.map((psicologo) => {
              const consultasDoPsicologo = consultas[psicologo.id] || [];

              if (consultasDoPsicologo.length === 0) return null;

              return (
                <div key={psicologo.id}>
                  <h4>{psicologo.nomeCompleto}</h4>
                  <ul>
                    {consultasDoPsicologo.map((consulta, index) => (
                      <li key={index}>
                        {consulta.nomeCliente} - {consulta.horarioConsulta}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleGoToPerfil(psicologo.id)}>
                    Ver Perfil
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default PaginaConsultas;
