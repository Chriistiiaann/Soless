import "./styles/Module.Formulario-Pago.css";
import { useState } from "react";
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { POST_ORDERS_ENDPOINT } from "../config"

function Formulario_Pago() {
  const cart = useCartContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formularioValido, setFormularioValido] = useState(false);

  const manejarCambio = () => {
    const campos = Array.from(document.querySelectorAll("input[required]"));
    const esValido = campos.every((campo) => campo.value.trim() !== "");
    setFormularioValido(esValido);
  };

  const handleProcederPago = async () => {
    const order = {
      userId: user.id,
      orderDate: new Date().toISOString(),
      orderItems: cart.cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productPrice * item.quantity,
      })),
    };

    try {
      const response = await fetch(POST_ORDERS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Orden realizada con éxito:", result);
        navigate("/ConfirmacionCompra");
      } else {
        console.error("Error al realizar la orden:", response.statusText);
        alert("Hubo un error al procesar tu orden.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un problema al procesar tu orden.");
    }
  };

  return (
    <>
      <div className="Input-Container">
        <form>
          <h2>Datos Personales</h2>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            required
            onChange={manejarCambio}
          />
          <input
            id="calle"
            name="calle"
            type="text"
            placeholder="Calle"
            required
            onChange={manejarCambio}
          />
          <input
            id="ciudad"
            name="ciudad"
            type="text"
            placeholder="Ciudad"
            required
            onChange={manejarCambio}
          />
          <input
            id="codigo-postal"
            name="codigo-postal"
            type="text"
            placeholder="Código Postal"
            required
            onChange={manejarCambio}
          />
          <h2>Datos Tarjeta</h2>
          <input
            id="tarjeta"
            name="tarjeta"
            type="text"
            placeholder="Tarjeta de crédito"
            required
            onChange={manejarCambio}
          />
          <input
            id="cvv"
            name="cvv"
            type="password"
            placeholder="CVV"
            required
            onChange={manejarCambio}
          />
        </form>
        <div className="total">
          <h2>Total del Carrito</h2>
          <p>{cart.totalPrice}€</p>
          {!formularioValido ? (
            <div className="error-container">Debe completar todos los campos para poder pagar</div>
          ) :
            <button
              className="big-button primary-button"
              onClick={handleProcederPago}
              disabled={!formularioValido}
            >
              Proceder al Pago
            </button>
          }
        </div>
      </div>
    </>
  );
}

export default Formulario_Pago;