import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Importa o CSS

const Menu = () => {
  return (
    <nav className="menu-navegacao">
      <ul>
        <li>
          <Link to="/">Início (Lista de Psicólogos)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;