import React from "react";
import { Link } from "react-router-dom";

const Navegacao = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "15px 0",
        marginBottom: "30px",
        backgroundColor: "#e9eff6",
        borderBottom: "2px solid #ccd8e6",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          gap: "40px",
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
              padding: "8px 12px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            Lista de Psicólogos
          </Link>
        </li>
        <li style={{ color: "#6c757d", display: "flex", alignItems: "center" }}>
          |
        </li>
        <li>
          <Link
            to="/minhas-consultas"
            style={{
              textDecoration: "none",
              color: "#28a745",
              fontWeight: "bold",
              padding: "8px 12px",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            Minhas Consultas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navegacao;
