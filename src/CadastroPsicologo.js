import React, { useState } from "react";

const CadastroPsicologo = ({ aoCadastrarPsicologo }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [crp, setCrp] = useState("");
  const [especialidades, setEspecialidades] = useState("");
  const [biografia, setBiografia] = useState("");
  const [endereco, setEndereco] = useState("");
  const [foto, setFoto] = useState(null);
  const [usuario, setUsuario] = useState(""); // Novo campo para nome de usuário
  const [senha, setSenha] = useState(""); // Novo campo para senha

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aoCadastrarPsicologo({
      id: Date.now().toString(),
      nomeCompleto,
      crp,
      especialidades: especialidades.split(","),
      biografia,
      endereco,
      foto,
      usuario, // Adicionando o usuário 28/11
      senha, // Adicionando a senha 28/11
      horarios: [],
    });
    setNomeCompleto("");
    setCrp("");
    setEspecialidades("");
    setBiografia("");
    setEndereco("");
    setFoto(null);
    setUsuario("");
    setSenha("");
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Psicólogo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo:</label>
          <input
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            required
          />
        </div>

        <div>
          <label>CRP:</label>
          <input
            type="text"
            value={crp}
            onChange={(e) => setCrp(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Especialidades (separe por vírgula):</label>
          <input
            type="text"
            value={especialidades}
            onChange={(e) => setEspecialidades(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Biografia:</label>
          <textarea
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        {/* Campos de Nome de Usuário e Senha */}
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Foto de Perfil:</label>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
          {foto && (
            <div className="foto-preview">
              <img src={foto} alt="Foto do Psicólogo" />
            </div>
          )}
        </div>

        <button type="submit">Cadastrar Psicólogo</button>
      </form>
    </div>
  );
};

export default CadastroPsicologo;
