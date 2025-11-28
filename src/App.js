import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import PaginaInicial from "./PaginaInicial";
import PaginaPerfil from "./PaginaPerfil";
import PaginaConsultas from "./PaginaConsultas";
import CadastroPsicologo from "./CadastroPsicologo";
import CadastroUsuario from "./CadastroUsuario";
import Navegacao from "./componentes/Navegacao";

import "./styles.css";

const MOCK_BIOS = [
  "Especialista em Terapia Cognitivo-Comportamental (TCC) com 5 anos de experiência, focada em transtornos de ansiedade e depressão em adultos.",
  "Psicóloga clínica com abordagem humanista, auxiliando pacientes no processo de autoconhecimento e desenvolvimento pessoal.",
  "Terapeuta de casais e famílias, utilizando métodos sistêmicos para melhorar a comunicação e resolver conflitos relacionais.",
  "Especializada no atendimento de crianças e adolescentes, com foco em dificuldades de aprendizagem e comportamento.",
  "Ampla experiência em tratamento de fobias e síndrome do pânico, utilizando técnicas de exposição e dessensibilização.",
  "Foco em saúde mental no trabalho, auxiliando profissionais com gestão de estresse e prevenção de síndrome de burnout.",
];

const MOCK_ESPECIALIDADES = [
  ["TCC", "Ansiedade", "Depressão"],
  ["Humanista", "Autoconhecimento", "Jovens"],
  ["Terapia de Casal", "Sistêmica", "Família"],
  ["Infantil", "Adolescentes", "Aprendizagem"],
  ["Fobias", "Pânico", "TCC"],
  ["Estresse", "Burnout", "Carreira"],
];

const MOCK_HORARIOS = [
  ["09:00", "10:00", "11:00", "14:00"],
  ["08:00", "09:00", "13:00", "15:00"],
  ["10:00", "11:00", "15:00", "16:00"],
  ["14:00", "15:00", "16:00", "17:00"],
  ["09:00", "11:00", "14:00", "16:00"],
  ["08:00", "10:00", "13:00", "17:00"],
];

const App = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [consultas, setConsultas] = useState(() => {
    const consultasSalvas = localStorage.getItem("consultas");
    return consultasSalvas ? JSON.parse(consultasSalvas) : {};
  });

  const [loading, setLoading] = useState(true);

  // Buscar psicólogos de exemplo
  useEffect(() => {
    const buscarPsicologos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://randomuser.me/api/?results=6&seed=mindcare"
        );
        const data = await response.json();

        const psicologosMapeados = data.results.map((user, index) => ({
          id: user.login.uuid,
          nomeCompleto: `${user.name.first} ${user.name.last}`,
          foto: user.picture.large,
          endereco: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}`,
          crp: `06/${Math.floor(Math.random() * 90000) + 10000}`,
          especialidades:
            MOCK_ESPECIALIDADES[index % MOCK_ESPECIALIDADES.length],
          biografia: MOCK_BIOS[index % MOCK_BIOS.length],
          horarios: MOCK_HORARIOS[index % MOCK_HORARIOS.length],
        }));

        setPsicologos(psicologosMapeados);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarPsicologos();
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
  };

  const aoCadastrarPsicologo = (novoPsicologo) => {
    setPsicologos([...psicologos, novoPsicologo]);
  };

  const aoCadastrarUsuario = (novoUsuario) => {
    console.log("Novo usuário cadastrado:", novoUsuario);
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
        {/* Adicionando a rota para cadastro do usuário */}
        <Route
          path="/cadastro-usuario"
          element={<CadastroUsuario aoCadastrarUsuario={aoCadastrarUsuario} />}
        />
      </Routes>
    </div>
  );
};

export default App;
