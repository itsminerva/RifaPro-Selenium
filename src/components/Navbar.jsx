function Navbar() {
  return (
    <header className="navbar">

      <div>

        <h2>Panel Administrativo</h2>

        <small
          style={{
            color: "#6B7280",
            fontSize: "14px"
          }}
        >
          Gestión de Rifas y Boletos
        </small>

      </div>

      <div className="user">

        👤 Administrador

      </div>

    </header>
  );
}

export default Navbar;