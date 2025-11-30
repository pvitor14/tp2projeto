// src/App.js

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./paginas/Home";
import PaginaPerfil from "./paginas/Perfil";
import PaginaConsultas from "./paginas/PaginaConsultas";
import CadastroPsicologo from "./paginas/CadastroPsicologo";
import CadastroUsuario from "./paginas/CadastroUsuario";
import Navegacao from "./componentes/Navegacao";
import Chat from "./componentes/Chat";

import "./styles.css";

// Dados mockados para testar a aplicação
const MOCK_BIOS = [
  "Especialista em Terapia Cognitivo-Comportamental (TCC) com 5 anos de experiência, focada em transtornos de ansiedade e depressão em adultos.",
  "Psicóloga clínica com abordagem humanista, auxiliando pacientes no processo de autoconhecimento e desenvolvimento pessoal.",
  "Terapeuta de casais e famílias, utilizando métodos sistêmicos para melhorar a comunicação e resolver conflitos relacionais.",
  "Especializada no atendimento de crianças e adolescentes, com foco em dificuldades de aprendizagem e comportamento.",
  "Ampla experiência em tratamento de fobias e síndrome do pânico, utilizando técnicas de exposição e dessensibilização.",
  "Foco em saúde mental no trabalho, auxiliando profissionais com gestão de estresse e prevenção de síndrome de burnout.",
];

// Especialidades para os psicólogos mockados
const MOCK_ESPECIALIDADES = [
  ["TCC", "Ansiedade", "Depressão"],
  ["Humanista", "Autoconhecimento", "Jovens"],
  ["Terapia de Casal", "Sistêmica", "Família"],
  ["Infantil", "Adolescentes", "Aprendizagem"],
  ["Fobias", "Pânico", "TCC"],
  ["Estresse", "Burnout", "Carreira"],
];

// Horários fictícios para agendamentos
const MOCK_HORARIOS = [
  ["09:00", "10:00", "11:00", "14:00"],
  ["08:00", "09:00", "13:00", "15:00"],
  ["10:00", "11:00", "15:00", "16:00"],
  ["14:00", "15:00", "16:00", "17:00"],
  ["09:00", "11:00", "14:00", "16:00"],
  ["08:00", "10:00", "13:00", "17:00"],
];

const App = () => {
  // Estado para armazenar os psicólogos carregados
  const [psicologos, setPsicologos] = useState(() => {
    const psicologosSalvos = localStorage.getItem("psicologos");
    return psicologosSalvos ? JSON.parse(psicologosSalvos) : [];
  });

  // Estado para armazenar as consultas agendadas
  const [consultas, setConsultas] = useState(() => {
    const consultasSalvas = localStorage.getItem("consultas");
    return consultasSalvas ? JSON.parse(consultasSalvas) : {};
  });

  // Estado de carregamento (loading)
  const [loading, setLoading] = useState(true);

  // Persistir psicólogos e consultas no localStorage
  useEffect(() => {
    localStorage.setItem("psicologos", JSON.stringify(psicologos));
  }, [psicologos]);

  useEffect(() => {
    localStorage.setItem("consultas", JSON.stringify(consultas));
  }, [consultas]);

  // Carregar psicólogos da API fictícia quando o aplicativo for inicializado
  useEffect(() => {
    const carregarPsicologos = async () => {
      try {
        setLoading(true); // Definir o estado de carregamento como verdadeiro
        const response = await fetch(
          "https://randomuser.me/api/?results=6&seed=mindcare"
        );
        const data = await response.json();

        // Mapeando os dados para incluir informações fictícias como especialidades e horários
        const psicologosMapeados = data.results.map((user, index) => ({
          id: user.login.uuid, // Usando o UUID como ID único
          nomeCompleto: `${user.name.first} ${user.name.last}`,
          foto: user.picture.large,
          endereco: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}`,
          crp: `06/${Math.floor(Math.random() * 90000) + 10000}`, // CRP gerado aleatoriamente
          especialidades:
            MOCK_ESPECIALIDADES[index % MOCK_ESPECIALIDADES.length],
          biografia: MOCK_BIOS[index % MOCK_BIOS.length],
          horarios: MOCK_HORARIOS[index % MOCK_HORARIOS.length],
        }));

        // Atualizar o estado de psicólogos caso o localStorage esteja vazio
        if (!psicologos || psicologos.length === 0) {
          setPsicologos(psicologosMapeados);
        }
      } catch (error) {
        console.error("Erro ao buscar psicólogos da API:", error);
      } finally {
        setLoading(false); // Definir o estado de carregamento como falso
      }
    };

    carregarPsicologos();
  }, []); // Carregar psicólogos somente uma vez, ao iniciar o app

  // Função para adicionar um novo psicólogo ao estado
  const aoCadastrarPsicologo = (novoPsicologo) => {
    const psicologoComID = { id: Date.now(), ...novoPsicologo }; // ID único gerado com Date.now()
    setPsicologos([...psicologos, psicologoComID]); // Atualizar o estado com o novo psicólogo
  };

  // Função para adicionar um novo usuário (no momento, apenas log de console)
  const aoCadastrarUsuario = (novoUsuario) => {
    console.log("Novo usuário cadastrado:", novoUsuario);
  };

  // Função para agendar uma consulta
  const aoAgendarConsulta = (idPsicologo, nomeCliente, horarioConsulta) => {
    const psicologo = psicologos.find(
      (p) => p.id.toString() === idPsicologo.toString()
    );
    if (!psicologo) return alert("Psicólogo não encontrado.");

    // Verificar se o horário está disponível
    if (!psicologo.horarios.includes(horarioConsulta)) {
      return alert("Horário indisponível.");
    }

    // Se tudo estiver certo, criar uma nova consulta e atualizar o estado
    const consultasDoPsicologo = consultas[idPsicologo] || [];
    const novaConsulta = { nomeCliente, horarioConsulta };

    setConsultas({
      ...consultas,
      [idPsicologo]: [...consultasDoPsicologo, novaConsulta],
    });
  };

  // Função para remover um psicólogo
  const removerPsicologo = (id) => {
    setPsicologos(psicologos.filter((p) => p.id !== id)); // Remover o psicólogo com o ID correspondente
  };

  return (
    <div className="app-container">
      <h1 className="titulo-principal">MindCare</h1>
      <Navegacao />

      {/* Definir as rotas da aplicação */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              psicologos={psicologos}
              aoCadastrarPsicologo={aoCadastrarPsicologo}
              removerPsicologo={removerPsicologo}
              loading={loading}
            />
          }
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
