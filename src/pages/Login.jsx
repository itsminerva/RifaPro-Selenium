import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = (e) => {
    e.preventDefault();

    if (
      correo === "admin@rifapro.com" &&
      password === "123456"
    ) {
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login">

      <div className="card">

        <h1>RifaPro</h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          Sistema de Gestión de Rifas
        </p>

        <form onSubmit={iniciarSesion}>

          <label>Correo electrónico</label>

          <input
            id="correo"
            type="email"
            placeholder="admin@rifapro.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <br />
          <br />

          <label>Contraseña</label>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <button
            id="btnLogin"
            type="submit"
          >
            Iniciar sesión
          </button>

          {error && (
            <p
              style={{
                color: "#DC2626",
                marginTop: "18px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}

        </form>

      </div>

    </div>
  );
}

export default Login;