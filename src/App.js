import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext"; // Autenticação (Provedor)

import PaginaInicial from "./PaginaInicial";
import PaginaPerfil from "./PaginaPerfil";
import PaginaConsultas from "./PaginaConsultas";
import CadastroPsicologo from "./CadastroPsicologo";
import CadastroUsuario from "./CadastroUsuario";
import PaginaLogin from "./PaginaLogin"; // Último update pra ter login no bate-papo (TP4 ou TP5)
import Navegacao from "./componentes/Navegacao";
import Chat from "./componentes/Chat";

import "./styles.css";

const RotaPrivada = ({ children }) => {
  const { user } = useAuth();
  // Se tem usuário, mostra o filho (Chat). Se não, manda pro Login.
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultas, setConsultas] = useState(() => {
    const consultasSalvas = localStorage.getItem("consultas");
    return consultasSalvas ? JSON.parse(consultasSalvas) : {};
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const response = await fetch("/psicologos.json");
        if (!response.ok) throw new Error("Erro ao carregar dados");
        const dados = await response.json();
        setPsicologos(dados);
      } catch (error) {
        console.error(error);
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
    setConsultas({
      ...consultas,
      [idPsicologo]: [
        ...consultasDoPsicologo,
        { nomeCliente, horarioConsulta },
      ],
    });
    alert("Consulta agendada!");
  };

  const aoCadastrarPsicologo = (novo) => {
    setPsicologos([...psicologos, novo]);
    alert("Psicólogo cadastrado!");
  };

  const aoCadastrarUsuario = (novo) => {
    console.log(novo);
    alert("Usuário cadastrado!");
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
        <Route path="/login" element={<PaginaLogin />} />

        <Route
          path="/chat"
          element={
            <RotaPrivada>
              <Chat />
            </RotaPrivada>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    // O AuthProvider fica em volta de tudo que usa rotas ou login
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
