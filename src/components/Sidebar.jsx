import { Link } from "react-router-dom";
import {
  FaHome,
  FaGift,
  FaTicketAlt,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">
          🎟
        </div>

        <div>
          <h1>RifaPro</h1>
          <p>Sistema de Gestión</p>
        </div>

      </div>

      <nav>

        <Link to="/dashboard">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/rifas">
          <FaGift />
          Gestión de Rifas
        </Link>

        <Link to="/comprar">
          <FaTicketAlt />
          Comprar Boletos
        </Link>

        <Link to="/">
          <FaSignOutAlt />
          Cerrar Sesión
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;