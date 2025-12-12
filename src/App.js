import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import PaginaInicial from "./PaginaInicial";
import PaginaPerfil from "./PaginaPerfil";
import PaginaConsultas from "./PaginaConsultas";
import CadastroPsicologo from "./CadastroPsicologo";
import CadastroUsuario from "./CadastroUsuario";
import Navegacao from "./componentes/Navegacao";
import Chat from "./componentes/Chat";

import "./styles.css";

const App = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Consultas - Estados
  const [consultas, setConsultas] = useState(() => {
    const consultasSalvas = localStorage.getItem("consultas");
    return consultasSalvas ? JSON.parse(consultasSalvas) : {};
  });

  // API Fetch usando json - TP4
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const response = await fetch("/psicologos.json");

        if (!response.ok) {
          throw new Error("Erro ao carregar dados dos psicólogos");
        }

        const dados = await response.json();
        setPsicologos(dados);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    localStorage.setItem("consultas", JSON.stringify(consultas));
  }, [consultas]);

  const aoAgendarConsulta = (idPsicologo, nomeCliente, horarioConsulta) => {
    const consultasDoPsicologo = consultas[idPsicologo] || [];
    const novaConsulta = { nomeCliente, horarioConsulta };

    setConsultas({
      ...consultas,
      [idPsicologo]: [...consultasDoPsicologo, novaConsulta],
    });
    alert("Consulta agendada com sucesso!");
  };

  const aoCadastrarPsicologo = (novoPsicologo) => {
    // Adiciona o novo psicólogo na lista em memória
    setPsicologos([...psicologos, novoPsicologo]);
    alert("Psicólogo cadastrado com sucesso!");
  };

  const aoCadastrarUsuario = (novoUsuario) => {
    console.log("Novo usuário cadastrado:", novoUsuario);
    alert("Usuário cadastrado com sucesso!");
  };

  return (
    <div className="app-container">
      <h1 className="titulo-principal">MindCare</h1>
      <Navegacao />

      <Routes>
        <Route
          path="/"
          element={<PaginaInicial psicologos={psicologos} loading={loading} />}
        />
        <Route
          path="/minhas-consultas"
          element={
            <PaginaConsultas consultas={consultas} psicologos={psicologos} />
          }
        />
        <Route
          path="/perfil/:id"
          element={
            <PaginaPerfil
              psicologos={psicologos}
              consultas={consultas}
              aoAgendarConsulta={aoAgendarConsulta}
            />
          }
        />
        <Route
          path="/cadastro-psicologo"
          element={
            <CadastroPsicologo aoCadastrarPsicologo={aoCadastrarPsicologo} />
          }
        />
        <Route
          path="/cadastro-usuario"
          element={<CadastroUsuario aoCadastrarUsuario={aoCadastrarUsuario} />}
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
