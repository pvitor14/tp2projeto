import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

const Chat = () => {
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const chatBoxRef = useRef(null);

  // Scrolla automaticamente para o final sempre que uma nova mensagem for enviada
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [mensagens]); // A dependência é 'mensagens', então só roda quando as mensagens mudam

  // Enviar a mensagem
  const enviarMensagem = () => {
    if (!texto.trim()) return; // Não deixa enviar mensagens vazias

    const novaMensagem = {
      autor: "Usuário", // Nome do usuário
      texto: texto.trim(),
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Atualiza o status das mensagens
    setMensagens((prevMensagens) => [...prevMensagens, novaMensagem]);
    setTexto(""); // Limpa o input
  };

  // Função de enviar com 'Enter'
  const handleKeyPress = (e) => {
    if (e.key === "Enter") enviarMensagem();
  };

  return (
    <div className="chat-container">
      <h2 className="chat-titulo">Chat</h2>

      <div className="chat-box" ref={chatBoxRef}>
        {mensagens.length === 0 && (
          <p className="chat-vazio">Nenhuma mensagem ainda.</p>
        )}
        {mensagens.map((msg, index) => (
          <div
            key={index}
            className={`mensagem-wrapper ${
              msg.autor === "Usuário" ? "usuario" : "sistema"
            }`}
          >
            <div className="balao-mensagem">
              <strong>{msg.autor}</strong>: {msg.texto}{" "}
              <span className="hora-msg">{msg.hora}</span>
            </div>
          </div>
        ))}
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
