import Button from "../components/Button";
import './styles/Module.ListaPedidos.css';
import { useNavigate } from 'react-router-dom';
import { URL_IMAGES } from '../config';
import PropTypes from 'prop-types';

const ListaPedidos = ({ pedidos }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/catalogo');
  };

  return (
    <div className='container'>
      <div className='titulo-lista-pedidos'>
        <h2>Mis Pedidos 📦</h2>
      </div>
      <div className="container-pedidos">
      {pedidos.length > 0 ? (
        pedidos.map((pedido, index) => (
          <div key={index}>
            <ul className="lista-pedidos">
              {pedido.orderItems.map((item, idx) => (
                <li key={idx} className="pedido">
                  <img className="img-pedido" src={URL_IMAGES + item.img_Name} alt={item.model}></img>
                  <p className="modelo"> <strong>Producto:</strong><br />{item.model} </p>
                  <p> <strong>Cantidad:</strong><br />{item.quantity} </p>
                  <p> <strong>Precio:</strong><br />{item.price / item.quantity}€</p>
                  <p> <strong>Subtotal:</strong><br />{' '}{item.price}€</p>
                  <p><strong>Pedido realizado el:</strong><br />{' '}{new Date(pedido.orderDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className='sin-pedidos'>
          <p>No tienes pedidos.</p>
        </div>
      )}
      </div>
      <Button
        text="Catálogo"
        onClick={handleNavigate}
        className="big-button primary-button"
      />
    </div>
  );
};

ListaPedidos.propTypes = {
  pedidos: PropTypes.array.isRequired,
};

export default ListaPedidos;
