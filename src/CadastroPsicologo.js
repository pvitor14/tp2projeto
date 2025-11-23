import React, { useState } from "react";

const CadastroPsicologo = ({ aoCadastrarPsicologo }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [crp, setCrp] = useState("");
  const [especialidades, setEspecialidades] = useState("");
  const [biografia, setBiografia] = useState("");
  const [endereco, setEndereco] = useState("");
  const [foto, setFoto] = useState(null);

  // Função para capturar a foto usando a câmera
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result); // A URL da imagem será armazenada no estado 'foto'
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para capturar a foto da câmera
  const handleFotoFromCamera = (e) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const constraints = {
      video: {
        facingMode: "environment", // usa a câmera traseira do celular
        width: 640,
        height: 480,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        setTimeout(() => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imgUrl = canvas.toDataURL("image/jpeg");
          setFoto(imgUrl);
          stream.getTracks().forEach((track) => track.stop());
        }, 1000); // Espera 1 segundo para capturar a foto
      })
      .catch((err) => {
        console.error("Erro ao acessar a câmera: ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPsicologo = {
      id: Date.now().toString(),
      nomeCompleto,
      crp,
      especialidades: especialidades.split(","),
      biografia,
      endereco,
      foto,
      horarios: [],
    };

    aoCadastrarPsicologo(novoPsicologo); // Envia para o App.js para atualizar a lista de psicólogos

    setNomeCompleto("");
    setCrp("");
    setEspecialidades("");
    setBiografia("");
    setEndereco("");
    setFoto(null);
  };

  return (
    <div>
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
        <div>
          <label>Foto de Perfil:</label>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
          <button type="button" onClick={handleFotoFromCamera}>
            Usar Câmera
          </button>
          {foto && (
            <div>
              <img src={foto} alt="Foto do Psicólogo" width="100" />
            </div>
          )}
        </div>
        <button type="submit">Cadastrar Psicólogo</button>
      </form>
    </div>
  );
};

export default CadastroPsicologo;
