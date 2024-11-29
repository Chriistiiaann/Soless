import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "./styles/Module.ConfirmacionCompra.css"

function ConfirmacionCompra() {
  const navigate = useNavigate();

  const handleClickButton1 = () => {
    navigate("/Pedidos");
  };

  const handleClickButton2 = () => {
    navigate("/");
  };

  return (
    <div class="centrado">
    <div class="container-confirmacion">
      <h1 class="titulo">Pedido Confirmado</h1>
      <Button
        text="Volver a Inicio"
        onClick={handleClickButton2}
        className="big-button primary-button"
      />
      <Button
        text="Mis Pedidos"
        onClick={handleClickButton1}
        className="big-button secondary-button"
      /> 
    </div>
  </div>
  );
}
export default ConfirmacionCompra;