import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { useState } from "react";

function Rifas() {
  const [rifas, setRifas] = useState([
    {
      id: 1,
      nombre: "PlayStation 5",
      precio: 10,
      fecha: "2026-08-30",
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [fecha, setFecha] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const guardarRifa = () => {
    if (
      nombre.trim() === "" ||
      precio === "" ||
      Number(precio) <= 0 ||
      fecha === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Complete correctamente todos los campos.",
      });
      return;
    }

    if (editando) {
      setRifas(
        rifas.map((r) =>
          r.id === idEditar
            ? {
                ...r,
                nombre,
                precio: Number(precio),
                fecha,
              }
            : r
        )
      );

      Swal.fire({
        icon: "success",
        title: "Rifa actualizada",
        text: "Los datos fueron modificados correctamente.",
      });

      setEditando(false);
      setIdEditar(null);
    } else {
      const nueva = {
        id: Date.now(),
        nombre,
        precio: Number(precio),
        fecha,
      };

      setRifas([...rifas, nueva]);

      Swal.fire({
        icon: "success",
        title: "Rifa creada",
        text: "La rifa fue registrada correctamente.",
      });
    }

    limpiarFormulario();
  };

  const editarRifa = (rifa) => {
    setNombre(rifa.nombre);
    setPrecio(rifa.precio);
    setFecha(rifa.fecha);

    setEditando(true);
    setIdEditar(rifa.id);
  };

  const eliminarRifa = async (id) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar rifa?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      setRifas(rifas.filter((r) => r.id !== id));

      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La rifa fue eliminada correctamente.",
      });
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setFecha("");

    setEditando(false);
    setIdEditar(null);
  };

  return (
    <Layout>

      <div className="card">

        <h1>Gestión de Rifas</h1>

        <p style={{ color: "#6B7280", marginBottom: "25px" }}>
          Cree, edite o elimine las rifas registradas en el sistema.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 180px 180px",
            gap: "15px",
            marginBottom: "20px",
          }}
        >

          <div>
            <label>Nombre de la Rifa</label>

            <input
              id="txtNombre"
              placeholder="Ej. iPhone 16 Pro Max"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label>Precio</label>

            <input
              id="txtPrecio"
              type="number"
              placeholder="10"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div>
            <label>Fecha</label>

            <input
              id="txtFecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >

          <button id="btnGuardar" onClick={guardarRifa}>
            {editando ? "Actualizar Rifa" : "Guardar Rifa"}
          </button>

          <button
            onClick={limpiarFormulario}
            style={{
              background: "#6B7280",
            }}
          >
            Limpiar
          </button>

        </div>

        <table id="tablaRifas">

          <thead>

            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Fecha</th>
              <th style={{ width: "220px" }}>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {rifas.map((rifa) => (

              <tr key={rifa.id}>

                <td>{rifa.nombre}</td>

                <td>RD$ {rifa.precio}</td>

                <td>{rifa.fecha}</td>

                <td>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >

                    <button
                      id={`editar-${rifa.id}`}
                      onClick={() => editarRifa(rifa)}
                    >
                      Editar
                    </button>

                    <button
                      id={`eliminar-${rifa.id}`}
                      onClick={() => eliminarRifa(rifa.id)}
                      style={{
                        background: "#991B1B",
                      }}
                    >
                      Eliminar
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Rifas;