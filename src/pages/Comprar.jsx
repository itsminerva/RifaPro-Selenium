import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { useState } from "react";

function Comprar() {

  const numeros = Array.from({ length: 20 }, (_, i) => i + 1);

  const [seleccionados, setSeleccionados] = useState([]);

  const seleccionarNumero = (numero) => {

    if (seleccionados.includes(numero)) {

      setSeleccionados(
        seleccionados.filter((n) => n !== numero)
      );

    } else {

      if (seleccionados.length >= 3) {

        Swal.fire({
          icon: "warning",
          title: "Límite alcanzado",
          text: "Solo puede seleccionar 3 boletos.",
        });

        return;
      }

      setSeleccionados([
        ...seleccionados,
        numero
      ]);

    }

  };

  const comprar = () => {

    if (seleccionados.length === 0) {

      Swal.fire({
        icon: "warning",
        title: "Sin boletos",
        text: "Seleccione al menos un boleto.",
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Compra realizada",
      text: `Boletos seleccionados: ${seleccionados.join(", ")}`,
    });

    setSeleccionados([]);

  };

  return (

    <Layout>

      <div className="card">

        <h1>Compra de Boletos</h1>

        <p
          style={{
            color: "#6B7280",
            marginBottom: "25px"
          }}
        >
          Seleccione hasta <strong>3 boletos</strong> para participar en la rifa.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(80px,1fr))",
            gap: "15px",
            marginBottom: "30px"
          }}
        >

          {numeros.map((numero) => (

            <button
              key={numero}
              id={`boleto-${numero}`}
              className="boleto"
              onClick={() => seleccionarNumero(numero)}

              style={{
                background: seleccionados.includes(numero)
                  ? "#16A34A"
                  : "#DC2626",
                color: "white",
                fontSize: "18px",
                fontWeight: "700",
                height: "70px",
                borderRadius: "12px"
              }}

            >

              {numero}

            </button>

          ))}

        </div>

        <div
          style={{
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            padding: "18px",
            marginBottom: "25px"
          }}
        >

          <h3 style={{ marginBottom: "10px" }}>
            Boletos seleccionados
          </h3>

          <p style={{ color: "#555" }}>

            {
              seleccionados.length > 0
                ? seleccionados.join(" • ")
                : "No ha seleccionado boletos."
            }

          </p>

        </div>

        <button
          id="btnComprar"
          onClick={comprar}
        >
          Confirmar Compra
        </button>

      </div>

    </Layout>

  );

}

export default Comprar;