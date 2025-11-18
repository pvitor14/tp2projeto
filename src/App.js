import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";

import Home from "./paginas/Home.js";
import Perfil from "./paginas/Perfil.js";
import Agendamento from "./paginas/Agendamento.js";

import Menu from "./componentes/Menu.js";

const App = () => {
  // ================================================
  // 1. GERENCIAMENTO DE ESTADO
  // ================================================
  const [psicologos, setPsicologos] = useState(() => {
    const psicologosSalvos = localStorage.getItem("psicologos");
    return psicologosSalvos ? JSON.parse(psicologosSalvos) : [];
  });

  const [consultas, setConsultas] = useState(() => {
    const consultasSalvas = localStorage.getItem("consultas");
    return consultasSalvas ? JSON.parse(consultasSalvas) : {};
  });

  // ================================================
  // 2. EFEITOS (LocalStorage e API)
  // ================================================

  // Salva psicólogos no LocalStorage
  useEffect(() => {
    localStorage.setItem("psicologos", JSON.stringify(psicologos));
  }, [psicologos]);

  // Salva consultas no LocalStorage
  useEffect(() => {
    localStorage.setItem("consultas", JSON.stringify(consultas));
  }, [consultas]);

  // Busca dados da API (só se o localStorage estiver vazio)
  useEffect(() => {
    const carregarPsicologosIniciais = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users?_limit=4"
        );
        const data = await response.json();

        // Adapta os dados da API para o formato do nosso app
        const psicologosAdaptados = data.map((user) => ({
          id: user.id,
          nomeCompleto: user.name,
          crp: `06/${user.id}000`,
          foto: `https://i.pravatar.cc/150?u=${user.id}`,
          especialidades: ["Terapia Cognitivo-Comportamental", "Ansiedade"],
          biografia: `Psicólogo(a) com ${user.company.catchPhrase}. Atende em ${user.address.city}.`,
          endereco: `${user.address.street}, ${user.address.suite}, ${user.address.city}`,
          horarios: ["09:00", "10:00", "14:00", "15:00"],
        }));
        setPsicologos(psicologosAdaptados);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    // Verifica se o localStorage está vazio para chamar a API
    const psicologosSalvos = localStorage.getItem("psicologos");
    if (!psicologosSalvos || JSON.parse(psicologosSalvos).length === 0) {
      carregarPsicologosIniciais();
    }
  }, []); // Array vazio

  // ================================================
  // 3. FUNÇÕES DE LÓGICA
  // ================================================
  const aoCadastrarPsicologo = (dados) => {
    const novoPsicologo = {
      id: Date.now(),
      ...dados,
    };
    setPsicologos([...psicologos, novoPsicologo]);
  };

  const aoAgendarConsulta = (idPsicologo, nomeCliente, horarioConsulta) => {
    const psicologo = psicologos.find(
      (p) => p.id.toString() === idPsicologo.toString()
    );

    if (!psicologo.horarios.includes(horarioConsulta)) {
      alert("Horário indisponível.");
      return;
    }

    const consultasDoPsicologo = consultas[idPsicologo] || [];
    const novaConsulta = { nomeCliente, horarioConsulta };

    setConsultas({
      ...consultas,
      [idPsicologo]: [...consultasDoPsicologo, novaConsulta],
    });
  };

  const removerPsicologo = (id) => {
    const listaFiltrada = psicologos.filter((p) => p.id !== id);
    setPsicologos(listaFiltrada);
  };

  // ================================================
  // 4. RENDERIZAÇÃO (ROTAS)
  // ================================================
  return (
    <div className="app-container">
      <h1 className="titulo-principal">MindCare</h1>

      {/* 2. MENU DE NAVEGAÇÃO ADICIONADO */}
      <Menu />

      <Routes>
        {/* Rota Principal (Home) */}
        <Route
          path="/"
          element={
            <Home
              psicologos={psicologos}
              aoCadastrarPsicologo={aoCadastrarPsicologo}
              removerPsicologo={removerPsicologo}
            />
          }
        />

        {/* Rota do Perfil (usa o ID na URL) */}
        <Route
          path="/perfil/:id"
          element={<Perfil psicologos={psicologos} />}
        />

        {/* Rota de Agendamento (usa o ID na URL) */}
        <Route
          path="/agendar/:id"
          element={
            <Agendamento
              psicologos={psicologos}
              consultas={consultas}
              aoAgendarConsulta={aoAgendarConsulta}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
