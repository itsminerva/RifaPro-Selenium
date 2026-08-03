import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Layout>

      <div className="card">

        <h1>Panel de Administración</h1>

        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          Bienvenido al sistema de gestión de RifaPro. Desde aquí puede administrar
          las rifas y realizar la venta de boletos.
        </p>

      </div>

      <br />

      <div className="stats">

        <div className="stat">
          <h3>12</h3>
          <p>Rifas Activas</p>
        </div>

        <div className="stat">
          <h3>258</h3>
          <p>Boletos Vendidos</p>
        </div>

        <div className="stat">
          <h3>RD$ 2,580</h3>
          <p>Ingresos Generados</p>
        </div>

      </div>

      <div className="card">

        <h2 style={{ marginBottom: "20px" }}>
          Accesos rápidos
        </h2>

        <div className="actions">

          <Link to="/rifas">
            <button id="btnRifas">
              Gestionar Rifas
            </button>
          </Link>

          <Link to="/comprar">
            <button id="btnComprar">
              Comprar Boletos
            </button>
          </Link>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;