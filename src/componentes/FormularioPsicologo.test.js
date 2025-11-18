import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import FormularioPsicologo from "./FormularioPsicologo.js";

describe("Componente <FormularioPsicologo />", () => {
  test("deve permitir que o usuário preencha e envie o formulário", () => {
    const mockAoCadastrar = jest.fn();

    render(<FormularioPsicologo aoCadastrarPsicologo={mockAoCadastrar} />);

    fireEvent.change(screen.getByPlaceholderText("Digite o nome completo"), {
      target: { value: "Dr. João Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText("Número do CRP"), {
      target: { value: "06/123456" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Ex: Ansiedade, Depressão, Crianças"),
      {
        target: { value: "Ansiedade, Terapia de Casal" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Ex: 09:00, 10:30, 14:00"), {
      target: { value: "10:00, 14:00" },
    });

    fireEvent.click(screen.getByText("Cadastrar Psicólogo"));

    expect(mockAoCadastrar).toHaveBeenCalledTimes(1);

    expect(mockAoCadastrar).toHaveBeenCalledWith({
      nomeCompleto: "Dr. João Silva",
      crp: "06/123456",
      foto: "",
      biografia: "",
      endereco: "",
      especialidades: ["Ansiedade", "Terapia de Casal"],
      horarios: ["10:00", "14:00"],
    });
  });
});
