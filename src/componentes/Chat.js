import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthContext"; // Importa o contexto
import { useNavigate } from "react-router-dom"; // Para redirecionar se não tiver logado
import "./Chat.css";

const Chat = () => {
  const { user } = useAuth(); // Pega o usuário logado
  const navigate = useNavigate();

  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const chatBoxRef = useRef(null);

  // Proteção extra: Se tentar acessar direto sem usuário, manda pro login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = () => {
    if (!texto.trim()) return;

    const novaMensagem = {
      autor: user ? user.nome : "Anônimo", // Usa o nome do login
      texto: texto.trim(),
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMensagens((prev) => [...prev, novaMensagem]);
    setTexto("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") enviarMensagem();
  };

  // Se não tiver usuário carregado ainda, não renderiza nada
  if (!user) return null;

  return (
    <div className="chat-container">
      <h2 className="chat-titulo">Chat de {user.nome}</h2>

      <div className="chat-box" ref={chatBoxRef}>
        {mensagens.length === 0 && (
          <p className="chat-vazio">
            Bem-vindo, {user.nome}! Inicie a conversa.
          </p>
        )}
        {mensagens.map((msg, index) => {
          // Verifica se fui eu que mandei a mensagem
          const souEu = msg.autor === user.nome;

          return (
            <div
              key={index}
              className={`mensagem-wrapper ${souEu ? "usuario" : "sistema"}`}
            >
              <div className="balao-mensagem">
                <strong>{msg.autor}</strong>: {msg.texto}{" "}
                <span className="hora-msg">{msg.hora}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem"
          className="input-texto"
        />
        <button onClick={enviarMensagem} className="btn-enviar">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
