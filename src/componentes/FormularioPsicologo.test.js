import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Importamos o componente atual correto
import FormularioPsicologo from "./FormularioPsicologo";

describe("Componente <CadastroPsicologo />", () => {
  test("deve preencher todos os campos e enviar o formulário com o objeto correto", () => {
    // Mock para receber os dados
    const mockAoCadastrar = jest.fn();

    render(<CadastroPsicologo aoCadastrarPsicologo={mockAoCadastrar} />);

    // 1. Preenchendo os campos usando os dados esperados
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
      target: { value: "Ana Maria Braga" },
    });

    fireEvent.change(screen.getByLabelText(/CRP/i), {
      target: { value: "06/12345" },
    });

    fireEvent.change(screen.getByLabelText(/Nome de Usuário/i), {
      target: { value: "ana.braga" },
    });

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/Endereço/i), {
      target: { value: "Avenida Faria Lima, 100, São Paulo" },
    });

    // Teste da divisão usando vírgula
    fireEvent.change(screen.getByLabelText(/Especialidades/i), {
      target: { value: "TCC,Ansiedade,Depressão" },
    });

    fireEvent.change(screen.getByLabelText(/Biografia/i), {
      target: { value: "Especialista em Terapia Cognitivo-Comportamental (TCC) com 5 anos de experiência, focada em transtornos de ansiedade e depressão em adultos." },
    });

    // 2. Botão de envio
    fireEvent.click(screen.getByText(/Cadastrar Psicólogo/i));

    // 3. Verificações
    expect(mockAoCadastrar).toHaveBeenCalledTimes(1);

    // Verifica o objeto lá na estrutura do JSON
    expect(mockAoCadastrar).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        nomeCompleto: "Ana Maria Braga",
        crp: "06/12345",
        usuario: "ana.braga",
        senha: "123456",
        endereco: "Avenida Faria Lima, 100, São Paulo",
        especialidades: ["TCC", "Ansiedade", "Depressão"],
        biografia:
          "Especialista em Terapia Cognitivo-Comportamental (TCC) com 5 anos de experiência, focada em transtornos de ansiedade e depressão em adultos.",
        foto: null,
        horarios: [],
      })
    );
  });
});
