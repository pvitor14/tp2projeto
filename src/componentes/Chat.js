import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const chatBoxRef = useRef(null);

  // Efetua o scroll automaticamente para o final sempre que uma nova mensagem for adicionada
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [mensagens]); // A dependência é 'mensagens', então só roda quando as mensagens mudam

  // Enviar a mensagem
  const enviarMensagem = () => {
    if (!texto.trim()) return; // Evita mensagens vazias

    const novaMensagem = {
      autor: "Usuário", // Nome fixo
      texto: texto.trim(),
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Atualiza o estado de mensagens
    setMensagens((prevMensagens) => [...prevMensagens, novaMensagem]);
    setTexto(""); // Limpa o input
  };

  // Função de teclas (enviar com 'Enter')
  const handleKeyPress = (e) => {
    if (e.key === "Enter") enviarMensagem();
  };

  return (
    <div
      className="chat-container"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <h2>Chat</h2>

      <div
        className="chat-box"
        ref={chatBoxRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {mensagens.length === 0 && (
          <p style={{ color: "#777" }}>Nenhuma mensagem ainda.</p>
        )}
        {mensagens.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: msg.autor === "Usuário" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                backgroundColor:
                  msg.autor === "Usuário" ? "#007bff" : "#e0e0e0",
                color: msg.autor === "Usuário" ? "#fff" : "#000",
              }}
            >
              <strong>{msg.autor}</strong>: {msg.texto}{" "}
              <span style={{ fontSize: "0.7em" }}>{msg.hora}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input" style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={enviarMensagem}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
